let mainInput = [];
let operands = [];
let operators = [];
let cumulativeAnswer = 0;
const maxInputLength = 10;
let firstOperandWasInput = false;
let decimalInInput = false;
let equalsUsedLastTime = false;


const screenInput = document.querySelector('#screen-input');
const screenResult = document.querySelector('#screen-result');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const decimalButton = document.querySelector('#decimal-button');
const equalsButton = document.querySelector('#equal-button');
const numberButtons = Array.from(document.querySelectorAll('.number-buttons'));
const operatorButtons = Array.from(document.querySelectorAll('.operator-buttons'));

clearButton.addEventListener('click', () => {
    screenInput.textContent = 0;
    resetInput();
    screenResult.textContent = '';
    cumulativeAnswer = 0;
    operators.length = 0;
    operands.length = 0;
    firstOperandWasInput = false;
});

deleteButton.addEventListener('click', () => {
    deleteSingleDigit(mainInput);
    if (mainInput.length === 0) {
        screenInput.textContent = 0;
    } else {
        screenInput.textContent = mainInput.join('');
    }
});

equalsButton.addEventListener('click', () => {
    if (operands.length === 0) {
        return;
    } 
    if (mainInput.length === 0 ) {
        operands.push(0);
    } else {
        operands.push(+mainInput.join(''));
    }
    cumulativeAnswer = calculate(operands, operators);
    screenResult.textContent = `${operands[0]} ${operators[0]} ${operands[1]} = ${cumulativeAnswer}`;
    operators.length = 0;
    operands.length = 0;
    operands.push(cumulativeAnswer);
    resetInput();
    screenInput.textContent = 0;
    equalsUsedLastTime = true;
    //Array.from(cumulativeAnswer.toString()).map(Number);
});

numberButtons.forEach(numberButton => numberButton.addEventListener('click', (e) => {
    if (decimalInInput && e.target.id === 'decimal-button') {
        return;
    }

    /*if (!firstOperandWasInput && operands.length > 0) {
        resetInput();
        firstOperandWasInput = true;
    }*/

    if (e.target.id === 'decimal-button') {
        mainInput.push('.');
        decimalInInput = true;
    } else {
        addNumberToInput(e, mainInput);
    }
    screenInput.textContent = mainInput.join('');
}));



operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', (e) => {
    if (equalsUsedLastTime) {
        operators.push(getOperator(e));
        screenResult.textContent = `${cumulativeAnswer} ${operators[0]}`;
        equalsUsedLastTime = false;
        return;
    }
    if (operands.length >= 1) {
        //do calculations
        if (mainInput.length === 0 ) {
            operands.push(0);
        } else {
            operands.push(+mainInput.join(''));
        }
        cumulativeAnswer = calculate(operands, operators);
        
        operators.length = 0;
        operands.length = 0;
        operands.push(cumulativeAnswer);
        operators.push(getOperator(e));
        screenResult.textContent = `${cumulativeAnswer} ${operators[0]}`;
        resetInput();
        screenInput.textContent = 0;

    } else {

        if (mainInput.length === 0 ) {
            operands.push(0);
        } else {
            operands.push(+mainInput.join(''));
        } 
        operators.push(getOperator(e));
        screenResult.textContent = `${operands[0]} ${operators[0]}`;
        resetInput();
        screenInput.textContent = 0;
    }


    
    /* 
    

    if (e.target.id !== 'equal-button') {

        cumulativeAnswer = calculate(operands, operators);

        operators.length = 0;
        operands.length = 0;
        resetInput();

        operands.push(cumulativeAnswer);//c
        operators.push(getOperator(e));
        screenResult.textContent = `${cumulativeAnswer} ${operators[0]}`;
        screenInput.textContent = 0;

    } else if (firstOperandWasInput && e.target.id === 'equal-button'){

        cumulativeAnswer = calculate(operands, operators);
        screenResult.textContent = `${operands[0]} ${operators[0]} ${operands[1]} =`;
        screenInput.textContent = cumulativeAnswer;
        
        operators.length = 0;
        operands.length = 0;
        resetInput();
        operands.push(cumulativeAnswer);
    } else {

        operators.push(getOperator(e));
        screenResult.textContent = `${operands[0]} ${operators[0]}`;
        screenInput.textContent = 0;
    }*/

}));

function resetInput() {
    decimalInInput = false;
    mainInput.length = 0;
}
function calculate(operandArray, operatorArray) {
    switch (operatorArray[0]) {
        case '/':
            return operandArray[0] / operandArray[1];
            break;
        case '*':
            return operandArray[0] * operandArray[1];
            break;
        case '-':
            return operandArray[0] - operandArray[1];
            break;
        case '+':
            return operandArray[0] + operandArray[1];
            break;
        default:
            break;
    }
}

function getOperator(e) {
    switch (e.target.id) {
        case 'divide-button':
            return '/';
            break;
        case 'multiply-button':
            return '*';
            break;
        case 'minus-button':
            return '-';
            break;
        case 'plus-button':
            return '+';
            break;
        default:
            break;
    }
}

function deleteSingleDigit(numberArray) {
    numberArray.pop();
}

function addNumberToInput(e, numberArray) {
    if (numberArray.length === maxInputLength) {
        return;
    }
    numberArray.push(e.target.id[0]);
    console.log(`${e.target.id[0]}`);
}

