// MODAL
const  modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = openModal
modalCloseButton.onclick = closeModal

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', handleScroll);
    }
};

window.addEventListener('scroll', handleScroll);

setTimeout(() => {
    openModal()
}, 10000)

