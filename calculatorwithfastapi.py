from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI(title="Mini Calculator API 🚀")

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

# Root route → serves HTML page
@app.get("/", response_class=HTMLResponse)
def home():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Mini Calculator</title>
    </head>
    <body>
        <h1>Mini Calculator UI 🚀</h1>
        <input type="number" id="a" placeholder="Enter first number">
        <input type="number" id="b" placeholder="Enter second number">
        <select id="operation">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
            <option value="//">//</option>
            <option value="%">%</option>
        </select>
        <button onclick="calculate()">Calculate</button>
        <h2 id="result"></h2>

        <script>
        async function calculate() {
            const a = Number(document.getElementById("a").value);
            const b = Number(document.getElementById("b").value);
            const op = document.getElementById("operation").value;

            const response = await fetch("/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({a: a, b: b, operation: op})
            });

            const data = await response.json();
            document.getElementById("result").innerText = "Result: " + data.result;
        }
        </script>
    </body>
    </html>
    """
    return html_content

# Calculator endpoint
@app.post("/calculate")
def calculate(req: CalcRequest):
    if req.operation not in operations:
        return {"error": "Invalid operator"}
    result = operations[req.operation](req.a, req.b)
    return {"expression": f"{req.a} {req.operation} {req.b}", "result": result}
