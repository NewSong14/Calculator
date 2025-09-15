from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
import re

app = FastAPI(title="Mini Calculator API 🚀")

# Serve static files (CSS + JS)
app.mount("/static", StaticFiles(directory=os.path.dirname(__file__)), name="static")

# Serve HTML page
@app.get("/", response_class=FileResponse)
def home():
    """
    Serve the main HTML page when visiting "/"
    """
    return FileResponse(os.path.join(os.path.dirname(__file__), "calindex.html"))

# Pydantic model for request body
class CalcRequest(BaseModel):
    expression: str  # full expression like "12+3*4"

# Allowed characters for safety (digits, spaces, operators)
ALLOWED_CHARS = re.compile(r'^[0-9+\-*/%//\s]+$')

# Calculator endpoint
@app.post("/calculate")
def calculate(req: CalcRequest):
    """
    Evaluate the given mathematical expression safely.
    """

    expr = req.expression.replace(" ", "")  # remove spaces

    # Safety check: allow only numbers and operators
    if not ALLOWED_CHARS.match(expr):
        return JSONResponse(
            status_code=400, content={"error": "Invalid characters in expression"}
        )

    try:
        # Safely evaluate the expression using Python's eval
        # Only allow certain operators: + - * / % //, no variables/functions
        result = eval(expr, {"__builtins__": None}, {})
    except ZeroDivisionError:
        return JSONResponse(
            status_code=400, content={"error": "Error: Division by zero"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=400, content={"error": f"Invalid expression: {str(e)}"}
        )

    # Return expression and result
    return {"expression": expr, "result": result}
