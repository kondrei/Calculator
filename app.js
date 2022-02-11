
class Calculator {
    /*
    * Class Calculator
    * @param {HTML Element} output = element where calculation will be shown
    *    
    * @returns (string) element.textContent
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
        document.querySelectorAll('.selected').forEach((element) => {
            element.classList.remove('selected')
        })
    }

    delKey() {
        let digitRemains = this.output.textContent.split('')
        digitRemains.pop();
        (digitRemains.join('')) ? output.textContent = digitRemains.join('') : output.textContent = '0';
        (this.operand) ? this.rightOperand = this.output.textContent : this.leftOperand = this.output.textContent
        this.output.textContent = this.formatDigits(this.output.textContent)
    }

    commaKey(value) {
        if (this.output.textContent.indexOf(value) < 0) {
            this.output.textContent += value;

            (this.operand) ? this.rightOperand += value : this.leftOperand += value
        }
    }

    numKey(value) {
        if (this.#checkLength(this.output.textContent) || this.firstIOperation) {
            (this.operand) ? this.rightOperand += value : this.leftOperand += value

            if (this.firstIOperation) {
                this.output.textContent = value
                this.firstIOperation = false
            } else
                (this.output.textContent === '0') ? this.output.textContent = value : this.output.textContent += value
        }
        this.output.textContent = this.formatDigits(this.output.textContent)
    }

    operandKey(value = '/') {
        if (this.leftOperand != 0) {
            document.getElementsByClassName(value)[0].classList.add('selected')
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
            document.getElementsByClassName('=')[0].classList.add('selected')
        }
    }

    percentKey() {
        if (!this.operand) {
            this.output.textContent = Number(this.output.textContent) / 100;
            this.leftOperand = this.output.textContent
        } else {
            this.rightOperand = this.output.textContent
            this.output.textContent = this.leftOperand * (this.rightOperand / 100)
        }
    }

    #calculate(left, right, operation) {
        let result = 0
        left = Number(left)
        right = Number(right)
        switch (operation) {
            case "+":
                result = left + right
                break;
            case "-":
                result = left - right
                break;
            case "*":
                result = left * right
                break;
            case "/":
                result = left / right
                break;
        }
        result = result.toFixed(2)
        this.resetKey()
        this.leftOperand = result
        if (!this.#checkLength(result.toString())) {
            output.classList.add('small')
            return Number(result).toExponential(2)
        }
        return this.formatDigits(result.toString())
    }

    #checkLength(number) {
        number = number.replaceAll(',', '')
        if (number.length > 10) {
            return false
        }

        return true;
    }


    formatDigits(number) {
        number = number.replaceAll(',', '')
        if (Number(number) > 999999) {
            output.classList.add('small')
        } else {
            output.classList.remove('small')
        }

        return parseFloat(number).toLocaleString()
    }

}

this.keys = [
    { type: 'reset', text: 'AC', color: 'gray' },
    { type: 'del', text: '&#8592;', color: 'gray' },
    { type: 'percent', text: '%', color: 'gray' },
    { type: 'operand', text: '/', color: 'orange' },
    { type: 'number', text: '7', color: 'black' },
    { type: 'number', text: '8', color: 'black' },
    { type: 'number', text: '9', color: 'black' },
    { type: 'operand', text: '*', color: 'orange' },
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

let calculator = new Calculator(output)

for (let key in keys) {
    let button = document.createElement('div')
    button.classList.add('button')
    if (keys[key].type === 'operand' || keys[key].type === 'equal') {
        button.classList.add(keys[key].text)
    }
    button.classList.add(keys[key].color)
    button.innerHTML = keys[key].text
    if (keys[key].text === '0') {
        button.classList.add('zero')
    }
    button.addEventListener('click', (element) => {
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
                calculator.operandKey(keys[key].text, element)
                break;
            case 'equal':
                calculator.equalKey()
                break;
            case 'percent':
                calculator.percentKey()
                break;
            default:
                break;
        }
    })
    buttons.appendChild(button)
}

document.querySelector('.background').addEventListener('click', () => {
    document.querySelector('.background').classList.remove('show')
})

document.addEventListener('keyup', (e) => {

    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Escape', 'Delete', 'Backspace', '.', '?', '+', '-', '/', '*', '%', 'Enter', '=']
    console.log(e.key)
    if (e.ctrlKey && e.key === 'c') {
        navigator.clipboard.writeText(output.textContent)
            .then(() => {
                document.querySelector('.message').textContent = ('copied to clipboard')
            })
        setTimeout(() => {
            document.querySelector('.message').textContent = '? for keyboard shortcuts'
        }, 2000)
    }

    if (e.ctrlKey && e.key === 'v') {
        navigator.clipboard.readText()
            .then(clipText => {
                output.textContent = calculator.formatDigits(clipText)
                calculator.leftOperand = clipText
                document.querySelector('.message').textContent = ('pasted from clipboard')
            })
        setTimeout(() => {
            document.querySelector('.message').textContent = '? for keyboard shortcuts'
        }, 2000)
    }

    if (numbers.indexOf(e.key) >= 0) {
        switch (e.key) {
            case 'Escape':
                calculator.resetKey()
                break;
            case 'Delete': case 'Backspace':
                calculator.delKey()
                break;
            case '.':
                calculator.commaKey(e.key)
                break;
            case '?':
                document.querySelector('.background').classList.toggle('show')
                break;
            case '+': case '-': case '/': case '*':
                calculator.operandKey(e.key)
                break;
            case 'Enter': case '=':
                calculator.equalKey()
                break;
            case '%':
                calculator.percentKey()
                break;
            default:
                calculator.numKey(e.key)
                break;
        }
    }
})