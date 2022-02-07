let clock = document.querySelector('.clock')
function showClock() {
    let currentTime = new Date()
    clock.textContent = addZero(currentTime.getHours()) + ':' + addZero(currentTime.getMinutes())
}
function addZero(time) {
    return (time < 10) ? '0' + time : time
}
showClock()
setInterval(showClock, 40000)

let keys = [
    { type: 'reset', text: 'AC', color: 'gray' },
    { type: 'del', text: '&#8592;', color: 'gray' },
    { type: 'procent', text: '%', color: 'gray' },
    { type: 'operand', text: '&#247;', color: 'orange' },
    { type: 'number', text: '7', color: 'black' },
    { type: 'number', text: '8', color: 'black' },
    { type: 'number', text: '9', color: 'black' },
    { type: 'operand', text: 'x', color: 'orange' },
    { type: 'number', text: '4', color: 'black' },
    { type: 'number', text: '5', color: 'black' },
    { type: 'number', text: '6', color: 'black' },
    { type: 'operand', text: '-', color: 'orange' },
    { type: 'number', text: '1', color: 'black' },
    { type: 'number', text: '2', color: 'black' },
    { type: 'number', text: '3', color: 'black' },
    { type: 'operand', text: '+', color: 'orange' },
    { type: 'number', text: '0', color: 'black' },
    { type: 'comma', text: '.', color: 'black' },
    { type: 'equal', text: '=', color: 'orange' },
]

let buttons = document.querySelector('.buttons')
let output = document.querySelector('.outputDisplay')

let leftOperand = 0;
let rightOperand = 0;
let operand = null;


for (let key in keys) {
    let button = document.createElement('div')
    button.classList.add('button')
    button.classList.add(keys[key].color)
    button.innerHTML = keys[key].text
    if (keys[key].text === '0') {
        button.classList.add('zero')
    }
    button.addEventListener('click', () => {
        buttonsEvents(keys[key]);
    })
    buttons.appendChild(button)
}

function allClear() {
    output.textContent = 0
    leftOperand = 0
    rightOperand = 0
    operand = null
}


function buttonsEvents(object) {

    if (object.type === 'reset') {
        allClear()
    }

    if (object.type === 'del') {
        let digitRemains = output.textContent.split('')
        digitRemains.pop();
        (digitRemains.join('')) ? output.textContent = digitRemains.join('') : output.textContent = '0'
    }

    if (object.type === 'number' && checkLength(output.textContent)) {
        (output.textContent === '0') ? output.textContent = object.text : output.textContent += object.text
    }

    if (object.type === 'comma') {
        if (output.textContent.indexOf(object.text) < 0)
            output.textContent += object.text
    }

    if (object.type === 'operand') {
        if (leftOperand != 0 && rightOperand != 0) {
            if (object.text === '+') {
                output.textContent = leftOperand + rightOperand
            }
        }
        if (operand === null) {
            leftOperand = formatNumber(output.textContent)
        }
        if (operand != null) {
            rightOperand = formatNumber(output.textContent)
        }

        operand = object.text

        console.log(leftOperand, operand, rightOperand)
    }

    output.textContent = displayDigits(output.textContent)
}

function displayDigits(number) {
    number = formatNumber(number)
    if (parseFloat(number) > 999999) {
        output.classList.add('small')
    } else {
        output.classList.remove('small')
    }

    return checkComma(number)
}

function checkComma(number) {
    if (number[number.length - 1] === '.') {
        number = parseFloat(number).toLocaleString()
        return number + '.'
    } else {
        return parseFloat(number).toLocaleString()
    }
}

function checkLength(number) {
    number = formatNumber(number)
    if (number.length > 10) {
        return false
    }

    return true;
}

function formatNumber(number) {
    return number.replaceAll(',', '')
}