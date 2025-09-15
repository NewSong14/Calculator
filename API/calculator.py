from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI(title="Mini Calculator API 🚀")

# Serve static files
app.mount("/static", StaticFiles(directory=os.path.dirname(__file__)), name="static")

# Calculator operations (same as your console logic)
operations = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b if b != 0 else "Error: Cannot divide by zero",
    "//": lambda a, b: a // b if b != 0 else "Error: Not possible when b=0",
    "%": lambda a, b: a % b if b != 0 else "Error: Not possible when b=0",
}

# Pydantic model for request
class CalcRequest(BaseModel):
    a: float
    b: float
    operation: str

# Serve HTML
@app.get("/", response_class=FileResponse)
def home():
    return FileResponse(os.path.join(os.path.dirname(__file__), "calindex.html"))

# Calculator endpoint
@app.post("/calculate")
def calculate(req: CalcRequest):
    if req.operation not in operations:
        return JSONResponse(status_code=400, content={"error": "Unknown operator"})
    
    try:
        result = operations[req.operation](req.a, req.b)
        if isinstance(result, str) and "Error" in result:
            return JSONResponse(status_code=400, content={"error": result})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Unexpected error: {str(e)}"})
    
    return {"expression": f"{req.a} {req.operation} {req.b}", "result": result}
