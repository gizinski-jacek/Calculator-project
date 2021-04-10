const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');
const allButtons = document.querySelectorAll('button');
const commaButton = document.querySelector('#comma');

let firstValue = '';
let secondValue = '';
let operator = '';
let secondValueTemp;
let operatorTemp;



allButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.id == 'clear') {
			clearCalc();
		}
		if (button.id == 'backspace') {
			if (display.textContent == "") {
				firstValue = '0' + button.textContent;
				display.textContent = firstValue;
			} else {
				firstValue += button.textContent;
				display.textContent = firstValue;
			}
		}
		if (button.id == 'comma') {
			firstValue = display.textContent.slice(0, -1);
			display.textContent = firstValue
		}
		if (display.textContent.includes('.')) {
			commaButton.disabled = true;
		} else {
			commaButton.disabled = false;
		}
		if (button.classList.contains('numbers')) {
			if (typeof(firstValue) == 'string') {
				firstValue += button.textContent;
				display.textContent = firstValue;
			} else {
				secondValue += button.textContent;
				display.textContent = secondValue;
			}
		}
		if (button.classList.contains('operators')) {
			if (!firstValue == '') {
				firstValue = Number(firstValue);
			}
			if (operator == '') {
				operator = button.textContent;
			}
			if (!typeof(firstValue) == 'number' && secondValue == '') {
				operator = button.textContent;
				display.textContent = firstValue;
			}
			if (!(secondValue == '') && (operator == ('+') || ('-') || ('*') || ('/') || ('='))) {
				secondValue = Number(secondValue);
			}

			// Hold second value and operator in temporary variable to use in
			// operate() in case user presses '=' again but dont clear them
			// if (button.textContent == '=') {
			// 	if (operatorTemp == undefined) {
			// 		operatorTemp = operator;
			// 	}
			// 	operator == '=';
			// 	if (secondValueTemp == undefined) {
			// 		secondValueTemp = secondValue;
			// 	}
			// }

			if ((typeof(secondValue) == 'number') || !(secondValueTemp == undefined)) {
				if ((operator == '=') && (secondValue == '') && !(secondValueTemp == undefined) && !(operatorTemp == undefined)) {
					firstValue = calculate(firstValue, operatorTemp, secondValueTemp);
				} else {
				firstValue = Number(calculate(firstValue, operator, secondValue).toFixed(5));
				}
				secondValue = '';
				operator = button.textContent;
				if ((firstValue) == 'Don\'t divide by zero') {
					clearCalc();
					display.textContent = 'Don\'t divide by zero';
				} else {
					display.textContent = firstValue;
				}
			}

			// if (operator == undefined) {
			// 	operator = button.textContent;
			// 	display.textContent = firstValue + ' ' + operator;
			// }
			// else if (operator == ('+') || ('-') || ('*') || ('/')) {
			// 	secondValue = parseInt(secondValue);
			// }
			// if (button.id == 'sum') {
			// 	firstValue = operate(firstValue, operator, secondValue);
			// 	secondValue = '';
			// 	display.textContent = firstValue;
			// }
		}
	})
})

function clearCalc() {
	display.textContent = '';
	firstValue = '';
	secondValue = '';
	operator = '';
	secondValueTemp;
	operatorTemp;
}

function calculate(a, operator, b) {
    if (operator == '+') {
		return add(a, b);
	}
	else if (operator == '-') {
		return subtract(a, b);
	}
	else if (operator == '*') {
		return multiply(a, b);
	}
	else if (operator == '/') {
		if (a == 0 || b == 0) {
			return 'Don\'t divide by zero'
		} else {
			return divide(a, b);
		}
	}
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}
