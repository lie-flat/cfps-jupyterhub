import uvicorn
from backend.config import port, root_path, APP_PROFILE

if __name__ == "__main__":
    match APP_PROFILE:
        case "dev":
            uvicorn.run("backend:app", host="127.0.0.1", port=port, reload=True, root_path=root_path)
        case "prod":
            uvicorn.run("backend:app", host="127.0.0.1", port=port, reload=False, root_path=root_path)