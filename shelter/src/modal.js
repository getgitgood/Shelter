const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal-window_wrapper');
const closeModalBtn = document.querySelector('.button-modal');
const currentCards = document.querySelector('.curr-items');
const modalContainer = document.querySelector('.modal-container')


function callModal(arg) {
  arg.classList.remove('modal-close');
  arg.classList.add('modal-open');
  body.classList.add('noscroll')
}

function closeModal(arg) {
  arg.classList.remove('modal-open');
  arg.classList.add('modal-close');
  body.classList.remove('noscroll')
}


  modalWindow.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-window_wrapper') ||
  e.target.classList.contains('button-modal')) {
    closeModal(modalWindow)
  }
})

try { 
currentCards.addEventListener('click', (e) => {
  let id = e.target.getAttribute('data-id');
  if (e.target.classList.contains('pets-item') ){
    callModal(modalWindow)
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

} catch(error) {
  console.log('happy browsing')
}