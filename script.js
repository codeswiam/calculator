function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a *b ;
}

function divide(a, b) {
    if (b == 0) return "MATH ERROR";
    return a / b;
}

function operate(a, op, b) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let operation = document.querySelector('.operation');
let result = document.querySelector('.result');
let firstNumber, secondNumber, operator;

// avoiding more than 1 decimal point in the same number
let operatorWasPressed = true; // the first number doesn't have an operator before it
let numberWasPressed = false;
let decimal = document.querySelector('.decimal');
decimal.disabled = true;

// when numbers are clicked
let numbers = document.querySelectorAll('.number');
numbers.forEach( number => number.addEventListener( 'click', function () {
    if (number.textContent != "." && operatorWasPressed && !numberWasPressed) {
        numberWasPressed = true;
        decimal.disabled = false;
    }
    if (result.textContent.length > 0) result.textContent = "";
    operation.textContent += number.textContent;
    if (number.textContent == ".") {
        numberWasPressed = false;
        operatorWasPressed = false;
        decimal.disabled = true;
    }
}));

// when operators are clicked
let operators = document.querySelectorAll('.operator');
operators.forEach( operator => operator.addEventListener( 'click', function () {
    if (operator.textContent == "=") return;
    if (result.textContent.length > 0) result.textContent = "";
    if (!operatorWasPressed) operatorWasPressed = true;
    // user should not be able to input two operators back to back
    if (!(/[-/x+]/).exec(operation.textContent[operation.textContent.length - 1]))
        operation.textContent += operator.textContent;
}));

// when delete is pressed
document.querySelector('.delete').addEventListener('click', function() {
    if (result.textContent.length > 0) result.textContent = "";
    if (operation.textContent.length > 0)
        operation.textContent = operation.textContent.slice(0, operation.textContent.length - 1);
    if (operation.textContent.length == 0) {
        // here it's as if clear was pressed
        operatorWasPressed = true;
        numberWasPressed = false;
        decimal.disabled = true;
    }
})

// when clear is pressed
document.querySelector('.clear').addEventListener('click', function() {
    if (operation.textContent.length > 0) operation.textContent = "";
    if (result.textContent.length > 0) result.textContent = "";
    operatorWasPressed = true;
    numberWasPressed = false;
    decimal.disabled = true;
})

let numberArr = [];
let operatorArr = [];

// function that evaluates the operation
// aka there should be n numbers and n-1 operations
function evaluate(str) {
    numberArr = str.split(/[-/x+]/).filter(element => element != "");
    operatorArr = str.split('').filter((char) => (/[-/x+]/).exec(char));
    return (numberArr.length == operatorArr.length + 1) ? true : false;
}

function calculateResult() {
    let resultValue = numberArr[0]; 
    for (let i = 0; i < operatorArr.length; i++) {
        firstNumber = parseFloat(resultValue);
        secondNumber = parseFloat(numberArr[i + 1]);
        operator = operatorArr[i];
        resultValue = operate(firstNumber, operator, secondNumber);
    }
    if (resultValue == "MATH ERROR") return resultValue;
    return resultValue.toFixed(5);
}

// when equals is pressed
document.querySelector('.equals').addEventListener('click', function () {
    if (!evaluate(operation.textContent)) {
        result.textContent = "SYNTAX ERROR"; 
        return;
    }
    if (operatorArr.length == 0) result.textContent = operation.textContent;
    else result.textContent = calculateResult();
})