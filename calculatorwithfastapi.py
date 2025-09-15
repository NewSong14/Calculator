#to run this online in fast api,run the following code in erminal
# uvicorn calculatorwithfastapi.py:app --reload

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

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

@app.post("/calculate")
def calculate(req: CalcRequest):
    if req.operation not in operations:
        return {"error": "Invalid operator"}
    
    result = operations[req.operation](req.a, req.b)
    return {
        "expression": f"{req.a} {req.operation} {req.b}",
        "result": result
    }
