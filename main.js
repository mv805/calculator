let mainInput = [];
const maxInputLength = 10;


const screenInput = document.querySelector('#screen-input');
const clearButton = document.querySelector('#clear-button');
const deleteButton = document.querySelector('#delete-button');
const numberButtons = Array.from(document.querySelectorAll('.number-buttons'));

clearButton.addEventListener('click', () => {
    clearElement(mainInput, screenInput);
});

deleteButton.addEventListener('click', () => {
    deleteSingleDigit(mainInput);
    updateScreenInput(mainInput);
});

numberButtons.forEach(numberButton => numberButton.addEventListener('click', (e) => {
    addNumberToInput(e, mainInput);
}));

function deleteSingleDigit(numberArray) {
    numberArray.pop();
}

function clearElement(numberArray, elementToClear) {
    numberArray.length = 0;
    updateScreenInput(numberArray);
    elementToClear.textContent = 0;
}

function addNumberToInput(e, numberArray) {
    if (numberArray.length === maxInputLength) {
        return;
    }
    numberArray.push(e.target.id[0]);
    console.log(`${e.target.id[0]}`);
    updateScreenInput(numberArray);
}

function updateScreenInput(numberArray) {
    screenInput.textContent = numberArray.join('');
}

