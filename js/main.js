// RANDOM COLOR GENERATOR

const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}




window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

// SLIDER BLOCK
const innerSlider = document.querySelector('.inner_slider')

fetch('./data/part.json')
    .then(response => response.json())
    .then(data => {
        let slides = ''
        data.video.forEach((item, index) => {
            slides += `
                <div class="slide ${index === 0 ? 'active_slide' : ''}">
                    <h2>${item.title}</h2>
                    <hr>
                    <div class="slide_card">
                        <div class="video_container">
                            <video src="${item.video}" controls autoplay muted="false"></video>
                        </div>
                    </div>
                </div>
            `
        })

        innerSlider.innerHTML = `
            <div class="slider">
                <button class="btn-slide" id="prev">&lt;</button>
                ${slides}
                <button class="btn-slide" id="next">&gt;</button>
            </div>
        `
        
        const slidesElements = document.querySelectorAll('.slide')
        const prev = document.getElementById('prev')
        const next = document.getElementById('next')
        let currentIndex = 0

        const hideSlide = () => {
            slidesElements.forEach((slide) => {
                const iframe = slide.querySelector('iframe')
                if (iframe) {
                    iframe.src = iframe.src
                }
                slide.style.opacity = 0
                slide.classList.remove('active_slide')
            })
        }
        
        const showSlide = (i = 0) => {
            slidesElements[i].style.opacity = 1
            slidesElements[i].classList.add('active_slide')
        }

        next.onclick = () => {
            currentIndex = currentIndex < slidesElements.length - 1 ? currentIndex + 1 : 0
            hideSlide()
            showSlide(currentIndex)
        }

        prev.onclick = () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : slidesElements.length - 1
            hideSlide()
            showSlide(currentIndex)
        }

        // const autoSlider = () => {
        //     setInterval(() => {
        //         currentIndex = currentIndex < slidesElements.length - 1 ? currentIndex + 1 : 0
        //         hideSlide()
        //         showSlide(currentIndex)
        //     }, 10000)
        // }
        // autoSlider()
    })
    .catch(error => {
        console.error('Error loading slider:', error)
        innerSlider.innerHTML = '<p>Error loading videos</p>'
    })
const episodesList = document.querySelector('.episodes_list')
const seasonList = document.querySelectorAll('.season_list h3')



fetch('../data/episodes.json')
    .then(response => response.json())
    .then(data => {
        showSeasonEpisodes(data[0])

        seasonList[0].classList.add('active_season')
        seasonList.forEach((seasonItem, index) => {
            seasonItem.onclick = () => {
                seasonList.forEach(item => {
                    item.classList.remove('active_season')
                })
                seasonItem.classList.add('active_season')
                showSeasonEpisodes(data[index])
            }
            // if (data[index] === 0) {
            //     document.querySelector(".h3").style.color = "pink"
            // }
        })
        
        function showSeasonEpisodes(season) {
            let episodesHTML = ''
            season.episodes.forEach(episode => {

                episodesHTML += `
                    <div class="episode">
                        <a href="${episode.url}" target="_blank"><img src="${episode.image}" alt="${episode.title}"></a>
                        <div class="episode_info">
                            <h3>${episode.title}</h3>
                            <p>${episode.description}</p>
                        </div>
                    </div>
                `
            })
        
            episodesList.innerHTML = episodesHTML
        }
    })
    .catch(error => {
        console.error('Error loading episodes:', error)
        episodesList.innerHTML = '<p>Error loading episodes</p>'
    })
