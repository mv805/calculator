let mainInput = [];
const maxInputLength = 10;


const screenInput = document.querySelector('#screen-input');
const clearButton = document.querySelector('#clear-button');
const numberButtons = Array.from(document.querySelectorAll('.number-buttons'));

clearButton.addEventListener('click', () => {
    clearInput(mainInput);
});
numberButtons.forEach(numberButton => numberButton.addEventListener('click', (e) => {
    addNumberToInput(e, mainInput);
}));

function clearInput(numberArray) {
    numberArray.length = 0;
    updateScreenInput(numberArray);
    screenInput.textContent = 0;
}

function addNumberToInput(e, numberArray) {
    if (numberArray.length === maxInputLength) {
        return;
    }
    mainInput.push(e.target.id[0]);
    console.log(`${e.target.id[0]}`);
    updateScreenInput(numberArray);
}

function updateScreenInput(numberArray) {
    screenInput.textContent = numberArray.join('');
}

