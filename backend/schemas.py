from pydantic import BaseModel


class User(BaseModel):
    username: str
    disabled: bool | None = False


class RegisterInfo(BaseModel):
    username: str
    password: str
    invite_code: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
