from fastapi import FastAPI
import backend.user
from .db import engine, BaseDBModel

BaseDBModel.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
async def root():
    return "Hello World!"


app.include_router(user.router)
