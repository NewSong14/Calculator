from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os

app = FastAPI(title="Mini Calculator API 🚀")

# Mount static folder to serve CSS
app.mount("/static", StaticFiles(directory=os.path.dirname(__file__)), name="static")

# Calculator operations
operations = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b if b != 0 else "Error: Cannot divide by zero",
    "//": lambda a, b: a // b if b != 0 else "Error: Not possible when b=0",
    "%": lambda a, b: a % b if b != 0 else "Error: Not possible when b=0",
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
        return {"error": "Invalid operator"}
    result = operations[req.operation](req.a, req.b)
    return {"expression": f"{req.a} {req.operation} {req.b}", "result": result}
