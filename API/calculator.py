from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI(title="Mini Calculator API 🚀")

# Serve static files (CSS + JS)
app.mount("/static", StaticFiles(directory=os.path.dirname(__file__)), name="static")

# Calculator operations
operations = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b if b != 0 else "Error: Cannot divide by zero",
    "//": lambda a, b: a // b if b != 0 else "Error: Cannot divide by zero",
    "%": lambda a, b: a % b if b != 0 else "Error: Cannot divide by zero",
}

class CalcRequest(BaseModel):
    a: int
    b: int
    operation: str

# Serve HTML page
@app.get("/", response_class=FileResponse)
def home():
    return FileResponse(os.path.join(os.path.dirname(__file__), "calindex.html"))

# Calculator endpoint
@app.post("/calculate")
def calculate(req: CalcRequest):
    if req.operation not in operations:
        return JSONResponse(status_code=400, content={"error": f"Invalid operator '{req.operation}'"})
    
    try:
        result = operations[req.operation](req.a, req.b)
        if isinstance(result, str) and "Error" in result:
            return JSONResponse(status_code=400, content={"error": result})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": f"Unexpected error: {str(e)}"})
    
    return {"expression": f"{req.a} {req.operation} {req.b}", "result": result}
