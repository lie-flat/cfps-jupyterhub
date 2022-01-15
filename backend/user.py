from jose import JWTError
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from urllib.parse import parse_qs, urlparse
import re

from .security import decode_token, create_access_token, verify_password, validate_password_strength, validate_token
from .schemas import User, RegisterInfo, TokenData
from .db import get_db, get_user_by_username, create_user, DBUser
from .config import INVITE_CODES, HUB_CLIENT_ID, HUB_CLIENT_SECRET

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
        raise HTTPException(status_code=400, detail="账户已停用")
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
            detail="用户名或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/token")
async def token(data: Request):
    body = await data.body()
    body = b"http://nothing?" + body  # Make the URL Parser happy
    qs = parse_qs(urlparse(body).query)
    code = qs.get(b"code", [None])
    if code[0] is not None:
        code = code[0].decode("utf-8") if len(code) > 0 else None
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing code")
    if not validate_token(code):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return {"access_token": code, "token_type": "bearer"}


def validate_username(username: str):
    if re.match(r'^[a-zA-Z0-9_]{4,16}$', username):
        return True
    return False


@router.post("/user-register/", response_model=User)
async def register(form_data: RegisterInfo, db: Session = Depends(get_db)):
    if form_data.invite_code not in INVITE_CODES:
        raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT, detail="邀请码无效")
    if not validate_username(form_data.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="用户名无效")
    if not validate_password_strength(form_data.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="你的密码太弱了")
    try:
        user = create_user(db, form_data)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="用户已存在")
    return User(username=user.username)


@router.get("/user-data")
async def user_data(current_user: DBUser = Depends(get_current_user)):
    return {"username": current_user.username, "is_active": current_user.is_active}
