from jose import JWTError
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status

from .security import decode_token, create_access_token, verify_password, validate_password_strength
from .schemas import User, RegisterInfo, TokenData
from .db import get_db, get_user_by_username, create_user
from .config import invite_codes, HUB_CLIENT_ID, HUB_CLIENT_SECRET

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user-login")


def authenticate_user(db, username, password):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/user-login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if form_data.client_id == HUB_CLIENT_ID and form_data.client_secret != HUB_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid client credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/user-register/", response_model=User)
async def register(form_data: RegisterInfo, db: Session = Depends(get_db)):
    if form_data.invite_code not in invite_codes:
        raise HTTPException(status_code=400, detail="Invalid invite code")
    if not validate_password_strength(form_data.password):
        raise HTTPException(status_code=400, detail="Password is too weak")
    try:
        user = create_user(db, form_data)
    except:
        raise HTTPException(status_code=400, detail="User already exists or DB error!")
    return User(username=user.username)


@router.get("/user-data")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
