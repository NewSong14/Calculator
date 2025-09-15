const screen = document.getElementById("screen");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const resetBtn = document.querySelector(".reset");
const calcBtn = document.querySelector(".calculate");

let a = "";
let b = "";
let operator = "";
let resultShown = false;

function updateScreen(value) {
    screen.innerText = value || "0";
}

// Numbers
numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (resultShown) { a = ""; b = ""; operator = ""; resultShown = false; }
        if (!operator) { a += btn.innerText; updateScreen(a); }
        else { b += btn.innerText; updateScreen(b); }
    });
});

// Operators
opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!a) return;
        operator = btn.innerText;
        updateScreen(operator);
    });
});

// Reset
resetBtn.addEventListener("click", () => { a=""; b=""; operator=""; updateScreen("0"); });

// Calculate
async function calculate() {
    if (!a || !b || !operator) return;

    try {
        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a: parseInt(a), b: parseInt(b), operation: operator })
        });

        const data = await response.json();

        if (data.error) { updateScreen(data.error); }
        else { a = data.result.toString(); b=""; operator=""; resultShown=true; updateScreen(a); }
    } catch (err) {
        updateScreen("Server error");
        console.error(err);
    }
}

// "=" button
calcBtn.addEventListener("click", calculate);

// Enter key
document.addEventListener("keydown", (event) => { if(event.key==="Enter") calculate(); });
