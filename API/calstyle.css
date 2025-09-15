async function calculate() {
    const a = Number(document.getElementById("a").value);
    const b = Number(document.getElementById("b").value);
    const op = document.getElementById("operation").value;

    const response = await fetch("/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({a, b, operation: op})
    });

    const data = await response.json();

    document.getElementById("result").innerText = 
        data.error ? "Error: " + data.error : "Result: " + data.result;
}
