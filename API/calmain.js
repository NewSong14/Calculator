// calmain.js
// Simple UI logic that mirrors your console calculator behaviour:
// - a, b, operator (one operation at a time)
// - result becomes new `a`
// - supports clicks + physical keyboard (0-9, + - * / %, Enter, Backspace, C)

const screen = document.getElementById("screen");

// state variables (strings so we can append digits)
let a = "";
let b = "";
let operator = "";
let resultShown = false; // when true, next number clears and starts new calc

// update the digital screen (show "0" if empty)
function updateScreen(val) {
  screen.textContent = val === "" || val === undefined ? "0" : String(val);
}

// ---------- Number button clicks ----------
document.querySelectorAll(".num").forEach(btn => {
  btn.addEventListener("click", () => {
    if (resultShown) { // after showing result, start fresh on next number
      a = ""; b = ""; operator = ""; resultShown = false;
    }
    if (!operator) {
      a += btn.textContent;
      updateScreen(a);
    } else {
      b += btn.textContent;
      updateScreen(b);
    }
  });
});

// ---------- Operator button clicks ----------
document.querySelectorAll(".op").forEach(btn => {
  btn.addEventListener("click", () => {
    const op = btn.textContent;
    if (!a) return;            // don't allow operator first
    if (operator && b) {       // if already have a full a,op,b -> compute first
      calculate();             // uses the same calculate() below
      operator = op;           // then set the new operator
    } else {
      operator = op;
    }
    updateScreen(operator);
  });
});

// ---------- Reset ----------
document.querySelector(".reset").addEventListener("click", () => {
  a = ""; b = ""; operator = ""; resultShown = false;
  updateScreen("0");
});

// ---------- Calculate (send to backend) ----------
async function calculate() {
  // require a, operator, b
  if (!a || !operator || !b) return;

  // parse ints (keeps parity with your original console code)
  const ai = parseInt(a, 10);
  const bi = parseInt(b, 10);

  try {
    const resp = await fetch("/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: ai, b: bi, operation: operator })
    });
    const data = await resp.json();

    if (data.error) {
      // show server error message (e.g., division by zero or invalid operator)
      updateScreen(data.error);
    } else {
      // show result and set up for next calculation (result becomes new a)
      a = String(data.result);
      b = "";
      operator = "";
      resultShown = true;
      updateScreen(a);
    }
  } catch (err) {
    updateScreen("Server error");
    console.error("Calculate error:", err);
  }
}

document.querySelector(".calculate").addEventListener("click", calculate);

// ---------- Keyboard support ----------
document.addEventListener("keydown", (ev) => {
  const key = ev.key;

  // if user types while result is shown, start fresh
  if (resultShown && key >= "0" && key <= "9") {
    a = ""; b = ""; operator = ""; resultShown = false;
  }

  // Numbers 0-9
  if (key >= "0" && key <= "9") {
    ev.preventDefault();
    if (!operator) {
      a += key;
      updateScreen(a);
    } else {
      b += key;
      updateScreen(b);
    }
    return;
  }

  // Operators (single-char). Note: '//' floor div is available via its button.
  if (["+", "-", "*", "/", "%"].includes(key)) {
    ev.preventDefault();
    if (!a) return;
    if (operator && b) {
      // compute first if user chains operator keys
      calculate().then(() => {
        operator = key;
        updateScreen(operator);
      });
    } else {
      operator = key;
      updateScreen(operator);
    }
    return;
  }

  // Enter => calculate
  if (key === "Enter" || key === "=") {
    ev.preventDefault();
    calculate();
    return;
  }

  // Backspace => delete last character intelligently
  if (key === "Backspace") {
    ev.preventDefault();
    if (b) {
      b = b.slice(0, -1);
      updateScreen(b || "0");
    } else if (operator) {
      operator = "";
      updateScreen(a || "0");
    } else if (a) {
      a = a.slice(0, -1);
      updateScreen(a || "0");
    }
    return;
  }

  // 'c' or 'C' => reset (like your CLI prompt)
  if (key.toLowerCase() === "c") {
    ev.preventDefault();
    a = ""; b = ""; operator = ""; resultShown = false;
    updateScreen("0");
    return;
  }

  // ignore other keys
});
