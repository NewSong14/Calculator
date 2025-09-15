document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "";

  function updateDisplay(value) {
    display.value = value;
  }

  function handleInput(value) {
    if (value === "C") {
      currentInput = "";
      updateDisplay("0");
    } else if (value === "=") {
      try {
        fetch("/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parseInput(currentInput)),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              updateDisplay("Error");
              currentInput = "";
            } else {
              updateDisplay(data.result);
              currentInput = String(data.result);
            }
          });
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
    } else if (value === "fun") {
      // Show smaller "fun" message temporarily, then reset to 0
      display.style.fontSize = "0.8rem";
      updateDisplay("this button doesn't do anything");

      setTimeout(() => {
        display.style.fontSize = "1.2rem";
        currentInput = "";
        updateDisplay("0");
      }, 2000);
    } else {
      // Reset font size for normal inputs
      display.style.fontSize = "1.2rem";
      currentInput += value;
      updateDisplay(currentInput);
    }
  }

  function parseInput(input) {
    const match = input.match(/(-?\d+(\.\d+)?)([+\-*/%]{1,2})(-?\d+(\.\d+)?)/);
    if (!match) return { a: 0, b: 0, operation: "+" };
    return {
      a: parseFloat(match[1]),
      b: parseFloat(match[4]),
      operation: match[3],
    };
  }

  // Button clicks
  document.querySelectorAll(".buttons button").forEach((button) => {
    button.addEventListener("click", () => handleInput(button.dataset.value));
  });

  // Keyboard input
  document.addEventListener("keydown", (e) => {
    if (/[0-9+\-*/.%]/.test(e.key)) {
      handleInput(e.key);
    } else if (e.key === "Enter") {
      handleInput("=");
    } else if (e.key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || "0");
    } else if (e.key.toLowerCase() === "f") {
      handleInput("fun");
    }
  });

  // Initialize display
  updateDisplay("0");
});
