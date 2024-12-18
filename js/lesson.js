// PHONE BLOCK

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button")
const phoneResult = document.querySelector("#phone_result")

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'Ok'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'Invalid for number'
        phoneResult.style.color = 'red'
    }
}

/// TAB SLIDER
const  tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentIndex = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
    currentIndex = index
}
const auto = () => {
    setInterval(() => {
        currentIndex++
        if (currentIndex > tabContentBlocks.length - 1) {
            currentIndex = 0
        }
        hideTabContent()
        showTabContent(currentIndex)
    }, 3000)
}


hideTabContent()
showTabContent()
auto()


tabsParent.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item,index) => {
            if(event.target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }

}


// CONVERTER
const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const euroInput = document.querySelector('#eur')



const converter = (element, targetElement, targetElement2) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)
            if(targetElement.id === 'som'){
                targetElement.value = (element.value * data.usd).toFixed(2)
                targetElement2.value = (element.value * data.eur).toFixed(2)
            }
            if(targetElement.id === 'usd'){
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if(targetElement.id === 'eur'){
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if(element.value === '') {
                targetElement.value = ''
                targetElement2.value = ''

            }
        }
    }

}
converter(somInput, usdInput, euroInput)
converter(usdInput, somInput, euroInput)
converter(euroInput,somInput,usdInput)



