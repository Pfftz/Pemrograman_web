document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
    let calculationComplete = false;
    let currentInput = "";

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            handleInput(this.textContent);
        });
    });

    document.addEventListener("keydown", function (event) {
        const key = event.key;
        if (
            (key >= "0" && key <= "9") ||
            key === "." ||
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "(" ||
            key === ")" ||
            key === "^" ||
            key === "%" ||
            key === "√" ||
            key === "±"
        ) {
            handleInput(key);
        } else if (key === "Backspace") {
            handleInput("←");
        } else if (key === "Escape") {
            handleInput("C");
        } else if (key === "Enter" || key === "=") {
            event.preventDefault();
            handleInput("=");
        }
    });

    function handleInput(value) {
        if (value === "C") {
            display.value = "";
            currentInput = "";
            calculationComplete = false;
        } else if (value === "←") {
            display.value = display.value.slice(0, -1);
            currentInput = currentInput.slice(0, -1);
        } else if (value === "=") {
            try {
                display.value = eval(currentInput.replace("^", "**"));
                calculationComplete = true;
            } catch {
                display.value = "Error";
            }
        } else if (value === "√") {
            try {
                display.value = Math.sqrt(eval(currentInput));
                calculationComplete = true;
            } catch {
                display.value = "Error";
            }
        } else if (value === "%") {
            try {
                display.value = eval(currentInput) / 100;
                calculationComplete = true;
            } catch {
                display.value = "Error";
            }
        } else if (value === "±") {
            if (currentInput.startsWith("-")) {
                currentInput = currentInput.slice(1);
            } else {
                currentInput = "-" + currentInput;
            }
            display.value = currentInput;
        } else {
            if (calculationComplete) {
                if (isOperator(value)) {
                    currentInput = display.value + value;
                } else {
                    currentInput = value;
                }
                calculationComplete = false;
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        }
    }

    function isOperator(value) {
        return ["+", "-", "*", "/", "^", "%"].includes(value);
    }
});
