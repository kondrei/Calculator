
class Calculator {
    /*
    * Class Calculator
    * @param {HTML Element} output = element where calculation will be shown
    *    
    *  @returns (string) element.textContent
    */
    constructor(output) {
        this.output = output

        this.showClock()
        this.resetKey()
    }

    showClock() {
        let clock = document.querySelector('.clock')
        function addZero(time) {
            return (time < 10) ? '0' + time : time
        }
        function displayClock() {
            let currentTime = new Date()
            clock.textContent = addZero(currentTime.getHours()) + ':' + addZero(currentTime.getMinutes())
        }
        displayClock()
        setInterval(displayClock, 1000)
    }

    resetKey() {
        this.output.textContent = 0
        this.leftOperand = 0
        this.rightOperand = 0
        this.operand = null
        this.firstIOperation = null
        console.log('reset method')
        document.querySelectorAll('.selected').forEach((element) => {
            element.classList.remove('selected')
        })
    }

    delKey() {
        let digitRemains = this.output.textContent.split('')
        digitRemains.pop();
        (digitRemains.join('')) ? output.textContent = digitRemains.join('') : output.textContent = '0';
        (this.operand) ? this.rightOperand = this.output.textContent : this.leftOperand = this.output.textContent
        console.log('delete method')
        this.output.textContent = this.#formatDigits(this.output.textContent)
    }

    commaKey(value) {
        if (this.output.textContent.indexOf(value) < 0) {
            this.output.textContent += value
        }
        (this.operand) ? this.rightOperand += value : this.leftOperand += value
    }

    numKey(value) {
        if (this.#checkLength(this.output.textContent)) {
            (this.operand) ? this.rightOperand += value : this.leftOperand += value

            if (this.firstIOperation) {
                this.output.textContent = value
                this.firstIOperation = false
            } else
                (this.output.textContent === '0') ? this.output.textContent = value : this.output.textContent += value
        }
        this.output.textContent = this.#formatDigits(this.output.textContent)
        console.log(this.leftOperand, this.operand, this.rightOperand)
    }

    operandKey(value, e) {
        if (this.leftOperand != 0) {
            e.target.classList.add('selected')
            this.operand = value
            this.firstIOperation = true
            if (this.leftOperand != 0 && this.rightOperand != 0 && this.operand) {
                this.output.textContent = this.#calculate(this.leftOperand, this.rightOperand, this.operand)
            }
        }
    }

    equalKey() {
        if (this.leftOperand != 0 && this.rightOperand != 0 && this.operand) {
            this.output.textContent = this.#calculate(this.leftOperand, this.rightOperand, this.operand)
        }
    }
    #calculate(left, right, operation) {
        let result = 0
        switch (operation) {
            case "+":
                result = parseFloat(left) + parseFloat(right)
                break;
            case "-":
                result = parseFloat(left) - parseFloat(right)
                break;
            case "x":
                result = parseFloat(left) * parseFloat(right)
                break;
            case "&#247;":
                result = parseFloat(left) / parseFloat(right)
                break;
        }
        this.resetKey()
        this.leftOperand = result
        return result
    }

    #checkLength(number) {
        number = this.#formatNumber(number)
        if (number.length > 10) {
            return false
        }

        return true;
    }

    #formatNumber(number) {
        return number.replaceAll(',', '')
    }

    #formatDigits(number) {
        number = this.#formatNumber(number)
        if (parseFloat(number) > 999999) {
            output.classList.add('small')
        } else {
            output.classList.remove('small')
        }

        return this.#checkComma(number)
    }

    #checkComma(number) {
        if (number[number.length - 1] === '.') {
            number = parseFloat(number).toLocaleString()
            return number + '.'
        } else {
            return parseFloat(number).toLocaleString()
        }
    }
}


this.keys = [
    { type: 'reset', text: 'AC', color: 'gray' },
    { type: 'del', text: '&#8592;', color: 'gray' },
    { type: 'percent', text: '%', color: 'gray' },
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

output = document.querySelector('.outputDisplay')
let calculator = new Calculator(output)

for (let key in keys) {
    let button = document.createElement('div')
    button.classList.add('button')
    button.classList.add(keys[key].color)
    button.innerHTML = keys[key].text
    if (keys[key].text === '0') {
        button.classList.add('zero')
    }
    button.addEventListener('click', (e) => {
        switch (keys[key].type) {
            case 'reset':
                calculator.resetKey()
                break;
            case 'del':
                calculator.delKey()
                break;
            case 'comma':
                calculator.commaKey(keys[key].text)
                break;
            case 'number':
                calculator.numKey(keys[key].text)
                break;
            case 'operand':
                calculator.operandKey(keys[key].text, e)
                break;
            case 'equal':
                calculator.equalKey()
                break;
            default:
                break;
        }
    })
    buttons.appendChild(button)
}



// let clock = document.querySelector('.clock')
// function showClock() {
//     let currentTime = new Date()
//     clock.textContent = addZero(currentTime.getHours()) + ':' + addZero(currentTime.getMinutes())
// }
// function addZero(time) {
//     return (time < 10) ? '0' + time : time
// }
// showClock()
// setInterval(showClock, 40000)

// let keys = [
//     { type: 'reset', text: 'AC', color: 'gray' },
//     { type: 'del', text: '&#8592;', color: 'gray' },
//     { type: 'percent', text: '%', color: 'gray' },
//     { type: 'operand', text: '&#247;', color: 'orange' },
//     { type: 'number', text: '7', color: 'black' },
//     { type: 'number', text: '8', color: 'black' },
//     { type: 'number', text: '9', color: 'black' },
//     { type: 'operand', text: 'x', color: 'orange' },
//     { type: 'number', text: '4', color: 'black' },
//     { type: 'number', text: '5', color: 'black' },
//     { type: 'number', text: '6', color: 'black' },
//     { type: 'operand', text: '-', color: 'orange' },
//     { type: 'number', text: '1', color: 'black' },
//     { type: 'number', text: '2', color: 'black' },
//     { type: 'number', text: '3', color: 'black' },
//     { type: 'operand', text: '+', color: 'orange' },
//     { type: 'number', text: '0', color: 'black' },
//     { type: 'comma', text: '.', color: 'black' },
//     { type: 'equal', text: '=', color: 'orange' },
// ]

// let buttons = document.querySelector('.buttons')
// let output = document.querySelector('.outputDisplay')

// let leftOperand = 0;
// let rightOperand = 0;
// let operand = null;
// let firstIOperation = null;


// for (let key in keys) {
//     let button = document.createElement('div')
//     button.classList.add('button')
//     button.classList.add(keys[key].color)
//     button.innerHTML = keys[key].text
//     if (keys[key].text === '0') {
//         button.classList.add('zero')
//     }
//     button.addEventListener('click', (e) => {
//         buttonsEvents(e, keys[key]);
//     })
//     buttons.appendChild(button)
// }

// function allClear() {
//     output.textContent = 0
//     leftOperand = 0
//     rightOperand = 0
//     operand = null
//     document.querySelectorAll('.selected').forEach((element) => {
//         element.classList.remove('selected')
//     })
// }


// function buttonsEvents(e, object) {

//     if (object.type === 'reset') {
//         allClear()
//     }

//     if (object.type === 'del') {
//         let digitRemains = output.textContent.split('')
//         digitRemains.pop();
//         (digitRemains.join('')) ? output.textContent = digitRemains.join('') : output.textContent = '0';
//         (operand) ? rightOperand = output.textContent : leftOperand = output.textContent
//     }

//     if (object.type === 'number' && checkLength(output.textContent)) {
//         (operand) ? rightOperand += object.text : leftOperand += object.text

//         if (firstIOperation) {
//             output.textContent = object.text
//             firstIOperation = false
//         } else
//             (output.textContent === '0') ? output.textContent = object.text : output.textContent += object.text
//     }

//     if (object.type === 'comma') {
//         if (output.textContent.indexOf(object.text) < 0) {
//             output.textContent += object.text
//         }
//         (operand) ? rightOperand += object.text : leftOperand += object.text
//     }

//     if (object.type === 'operand' && leftOperand != 0) {
//         e.target.classList.add('selected')
//         operand = object.text
//         firstIOperation = true
//         if (leftOperand != 0 && rightOperand != 0 && operand) {
//             output.textContent = calculate(leftOperand, rightOperand, operand)
//         }
//     }

//     if (object.type === 'percent') {
//         output.textContent = '0.' + output.textContent;
//         (operand) ? rightOperand = output.textContent : leftOperand = output.textContent
//     }

//     if (object.type === 'equal' && leftOperand != 0 && rightOperand != 0 && operand) {
//         output.textContent = calculate(leftOperand, rightOperand, operand)
//     }
//     output.textContent = formatDigits(output.textContent)
//     console.log(leftOperand, operand, rightOperand)
// }

// function calculate(left, right, operation) {
//     switch (operation) {
//         case "+":
//             result = parseFloat(left) + parseFloat(right)
//             break;
//         case "-":
//             result = parseFloat(left) - parseFloat(right)
//             break;
//         case "x":
//             result = parseFloat(left) * parseFloat(right)
//             break;
//         case "&#247;":
//             result = parseFloat(left) / parseFloat(right)
//             break;
//     }
//     allClear()
//     leftOperand = result
//     return result
// }

// function formatDigits(number) {
//     number = formatNumber(number)
//     if (parseFloat(number) > 999999) {
//         output.classList.add('small')
//     } else {
//         output.classList.remove('small')
//     }

//     return checkComma(number)
// }

// function checkComma(number) {
//     if (number[number.length - 1] === '.') {
//         number = parseFloat(number).toLocaleString()
//         return number + '.'
//     } else {
//         return parseFloat(number).toLocaleString()
//     }
// }

// function checkLength(number) {
//     number = formatNumber(number)
//     if (number.length > 10) {
//         return false
//     }

//     return true;
// }

// function formatNumber(number) {
//     return number.replaceAll(',', '')
// }

// document.querySelector('.background').addEventListener('click', () => {
//     document.querySelector('.background').classList.remove('show')
// })

// document.addEventListener('keyup', (e) => {
//     switch (e.key) {
//         case 'Escape':
//             allClear()
//             break;
//         case '?':
//             document.querySelector('.background').classList.toggle('show')
//             break;
//         default:
//             break;
//     }
// })