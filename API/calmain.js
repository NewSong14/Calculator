// ================================
// Cyberpunk 2035 Calculator JS
// ================================

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentValue = "";
let operator = null;
let firstOperand = null;

// Function to update display with subtle holographic effect
function updateDisplay(value) {
  display.value = ""; // clear
  value.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    span.style.transition = "opacity 0.15s ease-in-out";
    display.appendChild(span);
    setTimeout(() => {
      span.style.opacity = 1; // fade in each digit
    }, 50 * index);
  });
}

// Function to reset calculator
function resetCalculator() {
  currentValue = "";
  operator = null;
  firstOperand = null;
  updateDisplay("0");
}

// Function to calculate result
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

// Button click handling
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Fun button
    if (btn.id === "fun-button") {
      const original = display.value;
      updateDisplay("That button doesn't do anything");
      setTimeout(() => updateDisplay(original || "0"), 1500);
      return;
    }

    // Skip buttons without data-value
    if (!btn.dataset.value) return;

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

// Keyboard input support
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
