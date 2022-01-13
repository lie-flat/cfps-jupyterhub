import uvicorn
from backend.config import port, root_path

if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=port, reload=False, root_path=root_path)
