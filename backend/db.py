from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .schemas import RegisterInfo
from .security import get_password_hash

SQLALCHEMY_DATABASE_URL = "sqlite:///./users.sqlite"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

BaseDBModel = declarative_base()


class DBUser(BaseDBModel):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


def get_user(db, uid):
    return db.query(DBUser).filter(DBUser.id == uid).first()


def get_user_by_username(db, username):
    return db.query(DBUser).filter(DBUser.username == username).first()


def create_user(db, reg_info: RegisterInfo):
    hashed = get_password_hash(reg_info.password)
    user = DBUser(username=reg_info.username, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
