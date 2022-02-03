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
    { type: 'power', text: 'AC', color: 'gray' },
    { type: 'binary', text: '&#x00B1;', color: 'gray' },
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
    { type: 'comma', text: ',', color: 'black' },
    { type: 'operand', text: '=', color: 'orange' },
]

let buttons = document.querySelector('.buttons')
let output = document.querySelector('.outputDisplay')

for (let key in keys) {
    let button = document.createElement('div')
    button.classList.add('button')
    button.classList.add(keys[key].color)
    button.innerHTML = keys[key].text
    if (keys[key].text === '0') {
        button.classList.add('zero')
    }
    button.addEventListener('click', () => {
        if (keys[key].text === 'number') {
            output.textContent = keys[key].text
            console.log(keys[key].text === 'number')
        }
        console.log(keys[key].text)
    })
    buttons.appendChild(button)
}
