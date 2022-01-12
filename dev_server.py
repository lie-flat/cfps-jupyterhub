import uvicorn
from backend.config import port

if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=port, reload=True)