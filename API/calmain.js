// calmain.js

// Get references
const screen = document.getElementById("screen");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const resetBtn = document.querySelector(".reset");
const calcBtn = document.querySelector(".calculate");

let currentInput = "";  // Tracks the full expression

// Update the digital screen
function updateScreen(value) {
    screen.innerText = value || "0";
}

// Append number to input
numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentInput += btn.innerText;
        updateScreen(currentInput);
    });
});

// Append operator to input
opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentInput === "") return; // prevent starting with operator
        currentInput += btn.innerText;
        updateScreen(currentInput);
    });
});

// Reset button clears input and screen
resetBtn.addEventListener("click", () => {
    currentInput = "";
    updateScreen("0");
});

// Function to send expression to backend
async function calculate() {
    if (currentInput === "") return;

    try {
        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression: currentInput })
        });

        const data = await response.json();

        if (data.error) {
            updateScreen(data.error);
        } else {
            currentInput = data.result.toString();
            updateScreen(currentInput);
        }
    } catch (err) {
        updateScreen("Server error");
        console.error(err);
    }
}

// "=" button click
calcBtn.addEventListener("click", calculate);

// Handle Enter key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculate();
    }
});

// Optional: allow Backspace key to delete last character
document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput);
    }
});
