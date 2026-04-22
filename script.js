const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

// Helper: check operator
function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

// Button click handler
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) {
      handleInput(value);
    } else if (action) {
      handleAction(action);
    }
  });
});

// Handle input
function handleInput(value) {
  const lastChar = expression.slice(-1);

  // Prevent multiple operators
  if (isOperator(value) && isOperator(lastChar)) return;

  expression += value;
  updateDisplay();
}

// Handle actions
function handleAction(action) {
  switch (action) {
    case "clear":
      expression = "";
      break;

    case "backspace":
      expression = expression.slice(0, -1);
      break;

    case "equals":
      calculate();
      break;

    case "square":
      if (expression) {
        expression = Math.pow(eval(expression), 2).toString();
      }
      break;

    case "sqrt":
      if (expression) {
        const num = eval(expression);
        if (num < 0) {
          alert("Invalid input for square root");
          return;
        }
        expression = Math.sqrt(num).toString();
      }
      break;
  }

  updateDisplay();
}

// Calculate result
function calculate() {
  try {
    if (expression.includes("/0")) {
      alert("Cannot divide by zero");
      expression = "";
      return;
    }

    expression = eval(expression).toString();
  } catch {
    alert("Invalid Expression");
    expression = "";
  }
}

// Update display
function updateDisplay() {
  display.value = expression;
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    calculate();
    updateDisplay();
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (key === "Escape") {
    expression = "";
    updateDisplay();
  }
});