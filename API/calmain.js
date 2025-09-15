// calmain.js

// Get references
const screen = document.getElementById("screen");
const numButtons = document.querySelectorAll(".num");
const opButtons = document.querySelectorAll(".op");
const resetBtn = document.querySelector(".reset");
const calcBtn = document.querySelector(".calculate");

let currentInput = "";      // Tracks what user types
let lastOperator = null;    // Optional for visual feedback

// Update screen
function updateScreen(value) {
    screen.innerText = value || "0";
}

// Handle number button click
numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentInput += btn.innerText;
        updateScreen(currentInput);
    });
});

// Handle operator button click
opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentInput.length === 0) return; // prevent starting with operator
        currentInput += btn.innerText;
        updateScreen(currentInput);
    });
});

// Reset button
resetBtn.addEventListener("click", () => {
    currentInput = "";
    updateScreen("0");
});

// Calculate button
calcBtn.addEventListener("click", async () => {
    // Simple parser: split last operator from input
    // This handles only a single operation at a time (like your API)
    const match = currentInput.match(/(\d+)\s*(\+|\-|\*|\/|%|\/\/)\s*(\d+)/);
    if (!match) {
        updateScreen("Invalid input");
        return;
    }

    const a = parseInt(match[1]);
    const op = match[2];
    const b = parseInt(match[3]);

    try {
        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a, b, operation: op })
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
});
