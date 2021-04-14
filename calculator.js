const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');
const numbersButtons = document.querySelectorAll('button.numbers');
const operatorButtons = document.querySelectorAll('button.operators');
// const equalButton = document.querySelector('#sum');
const modifyButtons = document.querySelectorAll('button.modify');
// const deleteButton = document.querySelector('#delete');
const pointButton = document.querySelector('#comma');

let firstValue;
let secondValue;
let operator;
let result;
let operatorTemp;
let error = 'Don\'t divide by zero!';

numbersButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (!(result == null) || (display.textContent == error)) {
			result = null;
			display.textContent = null;
		}
		display.textContent += button.textContent;
		if (display.textContent.includes('.')) {
			pointButton.disabled = true;
		} else {
			pointButton.disabled = false;
		}
	})
})

operatorButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (firstValue == null) {
			firstValue = display.textContent;
		} else if (!(display.textContent == '') && secondValue == null) {
			secondValue = display.textContent;
		}
		display.textContent = null;
		if (!(firstValue == null) && !(secondValue == null)) {
			if (firstValue == 0 || secondValue == 0) {
				resetCalc();
				display.textContent = error;
			}
			if (button.id == 'sum') {
				if (operatorTemp == null) {
					operatorTemp = operator;
				}
				result = Number(calculate(firstValue, operatorTemp, secondValue).toFixed(5));
				display.textContent = result;
			}
			else {
				result = Number(calculate(firstValue, operator, secondValue).toFixed(5));
				firstValue = result;
				secondValue = null;
				operatorTemp = null;
				display.textContent = result;
			}
		}
		operator = button.textContent;
	})
})

modifyButtons.forEach((button) => {
	button.addEventListener('click', () => {
		if (button.id == 'clear') {
			resetCalc();
		} 
		if (button.id == 'delete') {
			display.textContent = display.textContent.slice(0, -1);
		}
		if (!(display.textContent.includes('.'))) {
			pointButton.disabled = false;
		} else {
			pointButton.disabled = true;
		}
	})
})

function resetCalc() {
	display.textContent = null;
	firstValue = null;
	secondValue = null;
	operator = null;
	result = null;
}

function calculate(a, operator, b) {
	a = Number(a);
	b = Number(b);
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
			return null;
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
