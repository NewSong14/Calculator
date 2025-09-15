// ======================
// Calculator Frontend JS
// ======================

// Grab references
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const resetBtn = document.getElementById("reset");

// Variables to hold inputs
let currentInput = "";
let operator = "";
let firstOperand = null;

// Function to update the display
function updateDisplay(value) {
  display.innerText = value;
}

// Function to send GA event
function trackEvent(action, label) {
  if (window.gtag) {
    gtag("event", action, {
      event_category: "Calculator",
      event_label: label,
    });
  }
}

// Handle button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    // Number pressed
    if (!isNaN(value) || value === ".") {
      currentInput += value;
      updateDisplay(currentInput);
      trackEvent("button_press", value); // GA tracking
    }

    // Operator pressed
    else if (["+", "-", "*", "/", "%", "//"].includes(value)) {
      if (currentInput !== "") {
        firstOperand = parseFloat(currentInput);
        currentInput = "";
        operator = value;
        updateDisplay(operator);
        trackEvent("operator_press", operator); // GA tracking
      }
    }

    // Equals pressed
    else if (value === "=") {
      if (firstOperand !== null && currentInput !== "" && operator !== "") {
        const secondOperand = parseFloat(currentInput);

        fetch("/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ a: firstOperand, b: secondOperand, operation: operator }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.result !== undefined) {
              updateDisplay(data.result);
              trackEvent("calculation", `${firstOperand} ${operator} ${secondOperand} = ${data.result}`);
            } else if (data.error) {
              updateDisplay(data.error);
              trackEvent("error", data.error);
            }
          });

        firstOperand = null;
        currentInput = "";
        operator = "";
      }
    }
  });
});

// Reset button
resetBtn.addEventListener("click", () => {
  currentInput = "";
  operator = "";
  firstOperand = null;
  updateDisplay("0");
  trackEvent("reset", "Calculator cleared"); // GA tracking
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    currentInput += key;
    updateDisplay(currentInput);
    trackEvent("key_press", key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    if (currentInput !== "") {
      firstOperand = parseFloat(currentInput);
      currentInput = "";
      operator = key;
      updateDisplay(operator);
      trackEvent("operator_key", operator);
    }
  } else if (key === "Enter") {
    document.querySelector("[data-value='=']").click();
  } else if (key === "c" || key === "C") {
    resetBtn.click();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
    trackEvent("backspace", "One char deleted");
  }
});
