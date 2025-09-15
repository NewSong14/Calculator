// ================================
// Modern 2025 Calculator JS
// ================================

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentValue = "";
let operator = null;
let firstOperand = null;

// Update display with simple modern effect
function updateDisplay(value) {
  display.value = value;  // simple, no extra spans
}

// Reset calculator
function resetCalculator() {
  currentValue = "";
  operator = null;
  firstOperand = null;
  updateDisplay("0");
}

// Calculate result
function calculate() {
  if (!operator || firstOperand === null) return;

  const a = parseFloat(firstOperand);
  const b = parseFloat(currentValue);
  let result;

  try {
    switch (operator) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "*": result = a * b; break;
      case "/": result = b !== 0 ? a / b : "Error: Cannot divide by zero"; break;
      case "//": result = b !== 0 ? Math.floor(a / b) : "Error: Cannot divide by zero"; break;
      case "%": result = b !== 0 ? a % b : "Error: Cannot divide by zero"; break;
      default: result = "Error";
    }
  } catch (e) {
    result = "Error";
  }

  updateDisplay(result.toString());
  currentValue = result.toString();
  firstOperand = null;
  operator = null;
}

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    if (value === "C") {
      resetCalculator();
    } else if (value === "=") {
      calculate();
    } else if (["+", "-", "*", "/", "//", "%"].includes(value)) {
      if (currentValue === "") return;
      firstOperand = currentValue;
      operator = value;
      currentValue = "";
      updateDisplay(operator);
    } else {
      currentValue += value;
      updateDisplay(currentValue);
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    currentValue += key;
    updateDisplay(currentValue);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    if (currentValue === "") return;
    firstOperand = currentValue;
    operator = key;
    currentValue = "";
    updateDisplay(operator);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    currentValue = currentValue.slice(0, -1);
    updateDisplay(currentValue || "0");
  } else if (key.toLowerCase() === "c") {
    resetCalculator();
  }
});

// Initialize display
resetCalculator();
