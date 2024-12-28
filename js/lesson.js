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

const converter = async (element, targetElement, targetElement2) => {
    const response = await fetch('../data/converter.json')
    const data = response.json()

            switch(element.id) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElement2.value = (element.value / data.eur).toFixed(2)
                    break
                case 'usd': 
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    targetElement2.value = (element.value * data.usd / data.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    targetElement2.value = (element.value * data.eur / data.usd).toFixed(2)
                    break
            }

            if(element.value === '') {
                targetElement.value = ''
                targetElement2.value = ''
            }


}


converter(somInput, usdInput, euroInput)
converter(usdInput, somInput, euroInput) 
converter(euroInput, somInput, usdInput)

// CARD SWITCHER
const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let cardId = 0
let maxId = 2

const cardSwitcher = async () => {
    try {
        const response = await fetch('../data/titans.json')
        const data = await response.json()
        const {titan, description, image} = data[cardId]
        cardBlock.innerHTML = `
            <div class="titan">
                <h3>${titan}</h3>
                <p>${description}</p>
            
            </div>
            <img src="${image}" alt="${titan}">
`
    } catch (error) {
        console.error('Error fetching titan data:', error)
    }
}

const cardSwitcherNext = () => {
    if(cardId >= maxId) {
        cardId = 0
    } else {
        cardId++
    }
    cardSwitcher()
}

const cardSwitcherPrev = () => {
    if(cardId <= 0) {
        cardId = maxId
    } else {
        cardId--
    }
    cardSwitcher()
}

cardSwitcher()
btnNext.onclick = () => cardSwitcherNext()
btnPrev.onclick = () => cardSwitcherPrev()


//WEATHER

const inputSearch =  document.querySelector('.cityName');
const searchBtn = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const weatherBlock = document.querySelector('#weather_block')

const API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'appid=e417df62e04d3b1b111abeab19cea714'

searchBtn.onclick = () => {

    fetch(`${API}?${API_KEY}&q=${inputSearch.value}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            city.innerHTML = data.name || 'Город не найден...'
            temp.innerHTML = data.main?.temp?  Math.round(data.main?.temp) + '&deg;C' : '(●\'◡\'●)'
            weatherBlock.src = `http://api.openweathermap.org/img/wn/${data.weather[0].icon}.png`

        })
    inputSearch.value = ''
}

