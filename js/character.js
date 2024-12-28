const characterContainer = document.querySelector('.character-container');

fetch('../data/character.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.innerHTML = `
                <img src="../images/${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>${character.japanese_name}</p>
            `;
            characterContainer.appendChild(characterCard);
        });
    })
    .catch(error => console.error('Error fetching character data:', error));


