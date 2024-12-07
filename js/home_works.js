// GMAIL BLOCK

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-z0-9.]+@gmail.com$/

gmailButton.onclick = () => {
    if(regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = 'Invalid for number'
        gmailResult.style.color = 'red'
    }
}



// MOVE BLOCK

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");
const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight;


let positionX = 0;
let positionY = 0;
let direction = 1;


const moveBlock = () => {
    if(direction === 1){
        if(positionX < maxWidth) {
            childBlock.style.left = `${positionX}px`
            positionX++
        }else {
            direction = 2;
            positionX = maxWidth
        }
    }else if(direction === 2) {
        if(positionY < maxHeight && positionX >= maxWidth) {
            childBlock.style.top = `${positionY}px`
            positionY++
        }else {
            direction = 3;
        }
    }else if(direction === 3){
        if(positionX > 0 && positionY >= maxHeight){
            childBlock.style.left = `${positionX}px`
            positionX--
        }else {
            direction = 4
        }
    }else if(direction === 4) {
        if(positionY > 0 && positionX >= 0) {
            childBlock.style.top = `${positionY}px`
            positionY--
        }else {
            direction = 1;
            positionY = 0;
        }
    }

    requestAnimationFrame(moveBlock)

}
moveBlock()

/// Timer

const seconds = document.querySelector('#seconds')

let intervalId;
let secondsValue = 0;
let isRunning = false ;

const startTimer = () => {
    if(!isRunning) {
        intervalId = setInterval(() => {
            secondsValue++
            seconds.innerHTML = secondsValue
        }, 1000)
    }
    isRunning = true
}


const stopTimer = () => {
    clearInterval(intervalId)
    isRunning = false
}
const resetTimer = () => {
    clearInterval(intervalId)
    secondsValue = 0
    seconds.innerHTML = secondsValue
    isRunning = false
}

document.querySelector('#start').addEventListener('click', startTimer)
document.querySelector('#stop').addEventListener('click', stopTimer)
document.querySelector('#reset').addEventListener('click', resetTimer)
