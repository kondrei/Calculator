let clock = document.querySelector('.clock')
let currentTime = new Date()
clock.textContent = addZero(currentTime.getHours()) + ':' + addZero(currentTime.getMinutes())

function addZero(time) {
    return (time < 10 ) ? '0' + time : time
}
