const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal-window_wrapper');
const closeModalBtn = document.querySelector('.button-modal');
const currentCards = document.querySelector('.curr-items');
const modalContainer = document.querySelector('.modal-container')
console.log(currentCards)

function callModal() {
  modalWindow.classList.remove('modal-close');
  modalWindow.classList.add('modal-open');
  body.classList.add('noscroll')
}

function closeModal() {
  modalWindow.classList.remove('modal-open');
  modalWindow.classList.add('modal-close');
  body.classList.remove('noscroll')
}

function modalHandler(e) {
  if (e.target.classList.contains('modal-window_wrapper') ||
  e.target.classList.contains('button-modal')) {
    closeModal
  }
}
modalWindow.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-window_wrapper') ||
  e.target.classList.contains('button-modal')) {
    closeModal()
  }
})

currentCards.addEventListener('click', (e) => {
  let id = e.target.getAttribute('data-id');
  console.log(id)
  if (e.target.classList.contains('pets-item') || 
    e.target.classList.contains('button--secondary')) {
    callModal()
  }
  fetch('./src/pets_info.json')
  .then(response => response.json())
  .then(data => {
    modalContainer.innerHTML = '';
    let [name, img, type, breed, info, age, 
      inoculations, diseases, parasites] = 
      [data[id].name, data[id].img, data[id].type, 
      data[id].breed, data[id].description, data[id].age, data[id].inoculations, data[id].diseases, data[id].parasites];
    let html = `
      <button class="button button-modal">&#10006;</button>
      <div class="modal_background">
        <img src="${img}" alt="pet_${type}_${name}" class="modal-img">
      </div>
      <div class="modal_content">
        <h3 class="modal_pet-name">${name}</h3>
        <h4 class="modal_pet-specimen"><span class='modal_pet-type'>${type}</span> - <span class='modal_pet-breed'>${breed}</span></h4>
        <p class="modal_pet-info">${info}</p>
        <ul class="modal_pet-summary">
          <li class="summary-items">Age: <span class="summary-age">${age}</span></li>
          <li class="summary-items">Inoculations: <span class="summary-inoculations">${[...inoculations]}</span></li>
          <li class="summary-items">Diseases: <span class="summary-deseases">${[...diseases]}</span></li>
          <li class="summary-items">Parasites: <span class="summary-parasites">${[...parasites]}</span></li>
        </ul>`;
      modalContainer.insertAdjacentHTML('afterbegin', html)
  })
})

// "name": "Katrine",
// "img": "./assets/images/pets/katrine.png",
// "type": "Cat",
// "breed": "British Shorthair",
// "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
// "age": "6 months",
// "inoculations": ["panleukopenia"],
// "diseases": ["none"],
// "parasites": ["none"]
// },
// function setModalData(arr, data) {
//   const content = document.querySelector('.modal_content')
//   const name = content.querySelector('.modal_pet-name');
//   const specimen = content.querySelector('.modal_pet-specimen');
//   const info = content.querySelector('.modal_pet-info');
//   const age = content.querySelector('.summary-age');
//   const inoculations = content.querySelector('.summary-inoculations');
//   const deseases = content.querySelector('.summary-deseases');
//   const parasites = content.querySelector('.summary-parasites');
// }

fetch('./src/pets_info.json')
  .then(response => response.json())
  .then(data => {

  })