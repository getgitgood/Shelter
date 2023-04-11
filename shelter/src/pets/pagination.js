const body = document.querySelector('body');
const modalWindow = document.querySelector('.modal-window_wrapper');
const modalContainer  = document.querySelector('.modal-container');
const petsContainer = document.querySelector('.pets-items');
const petsItems = document.querySelector('.pets-item');
const petsWrapper = document.querySelector('.pets-wrapper');
const paginationNav = document.querySelector('.pets-pagination');


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

function getRandom (num) {
  return Math.round(Math.random() * num)
}

function getCardsNumber() {
  let quantifier = 2;
  let padding = parseInt((window.getComputedStyle(petsWrapper).paddingLeft))
  const CARD_WIDTH = 280;
  let cardsRows = Math.round((petsWrapper.offsetWidth - padding) / CARD_WIDTH);
  if (cardsRows < 2) {
    quantifier = 3;
  }
  return cardsRows * quantifier;
}

let cardsQuantity = 8;

function makeSeedArr(num) {
  const seedArr = [];
  while (seedArr.length < num) {
    let random = getRandom(7)
    if (seedArr.indexOf(random) === -1) {
      seedArr.push(random)
    }
    getRandom(7);
  }
  return seedArr;
}

function makeChuncks(arr, chunkSize) {
  const chunckArr = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunck = arr.slice(i, i + chunkSize);
    chunckArr.push(chunck)
  }
  return chunckArr;
}

function shuffleArr(arr) {
  const shuffledArr = [];
  arr.forEach(item => {
    let n = item.length;
    let j = getRandom(n - 1);
    for (let i = 0; i < n; i += 1) {
      [item[j], item[i]] = [item[i], item[j]]
    }
    getRandom(n - 1);
    if (shuffleArr[j] === undefined) {
      shuffledArr.push(item)
    } else {
      getRandom(n-1)
    }
  })
  return shuffledArr
}

const finalSequenceArr = [];
const newArr = makeChuncks(makeSeedArr(8), 3);
function mergeFinalArray(arr, quantifier) {
  
  for (let i = 0; i < quantifier; i += 1) {
    shuffleArr(arr)
    arr.forEach(item => finalSequenceArr.push(...item))
  }
}

mergeFinalArray(newArr, 6)

function generateCards(arr, page, cardsOnPage, data) {
  petsContainer.innerHTML = ''
  page = page - 1;
  const currCardsStart = page * cardsOnPage;
  const currCardsEnd = (page + 1) * cardsOnPage;
  const currentPage = arr.slice(currCardsStart, currCardsEnd);

  currentPage.forEach(num => {
    const name = data[num].name;
    const img = data[num].img;
    const html = `
    <div data-id=${num} class="pets-item">
      <img src="../../${img}" alt="pet_${name}" class="pets-image">
      <span class="pets-item-name">${name}</span>
      <button class="button button--secondary">Learn more</button>
    </div>`;
    petsContainer.insertAdjacentHTML('afterbegin', html)
  })
}

function totalPages(arr, cardsOnPage) {
  return Math.floor(arr.length / cardsOnPage)
}

modalWindow.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-window_wrapper') ||
  e.target.classList.contains('button-modal')) {
    closeModal(modalWindow)
  }
})

let pageNumber = 1;
fetch('../../src/pets_info.json')
  .then(response => response.json())
  .then(data => {
    
    generateCards(finalSequenceArr, pageNumber, getCardsNumber(), data)
    const currentPageCounter = paginationNav.querySelector('#page-count');
    const next = paginationNav.querySelector('#next');
    const prev = paginationNav.querySelector('#prev');
    paginationNav.addEventListener('click', (e) => {
      let id = e.target.id;
      let maxPages = totalPages(finalSequenceArr, getCardsNumber());
  
      switch (id) {
        case 'next':
          pageNumber += 1;
          break;
        case 'prev':
          pageNumber -= 1;
          break
        case 'last':
          pageNumber = maxPages;
          break
        case 'first':
          pageNumber = 1;
          break
      }
      if (pageNumber >= maxPages) {
        prev.classList.remove('button--inactive')
        prev.previousElementSibling.classList.remove('button--inactive')
        next.classList.add('button--inactive')
        next.nextElementSibling.classList.add('button--inactive')
      } else if (pageNumber === 1) {
        next.classList.remove('button--inactive')
        next.nextElementSibling.classList.remove('button--inactive')
        prev.classList.add('button--inactive')
        prev.previousElementSibling.classList.add('button--inactive')
      } else {
        next.classList.remove('button--inactive')
        next.nextElementSibling.classList.remove('button--inactive')
        prev.classList.remove('button--inactive')
        prev.previousElementSibling.classList.remove('button--inactive')
      }
      if (pageNumber > maxPages) {
        pageNumber = maxPages
      } else if (pageNumber < 1) {
        pageNumber = 1;
      }
      
      currentPageCounter.textContent = pageNumber
      generateCards(finalSequenceArr, pageNumber, getCardsNumber(), data)
    })
    petsContainer.addEventListener('click', (e) => {
      let id = e.target.getAttribute('data-id');
      if (e.target.classList.contains('pets-item') ){
        callModal(modalWindow)
      }
      modalContainer.innerHTML = '';
      let [name, img, type, breed, info, age, 
        inoculations, diseases, parasites] = 
        [data[id].name, data[id].img, data[id].type, 
        data[id].breed, data[id].description, data[id].age, data[id].inoculations, data[id].diseases, data[id].parasites];
      let html = `
        <button class="button button-modal">&#10006;</button>
        <div class="modal_background">
          <img src="../../${img}" alt="pet_${type}_${name}" class="modal-img">
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
          </ul>
        `;
        
      modalContainer.insertAdjacentHTML('afterbegin', html)
    })
    window.addEventListener('resize', function() {
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          let maxPages = totalPages(finalSequenceArr, getCardsNumber())
          if (pageNumber > maxPages) {
            pageNumber = maxPages;
            currentPageCounter.textContent = pageNumber;
          }
          if (pageNumber < maxPages) {
            next.classList.remove('button--inactive')
            next.nextElementSibling.classList.remove('button--inactive')
          }
          generateCards(finalSequenceArr, pageNumber, getCardsNumber(), data)
      }, 75);
      })}
    );
  })

  let resizeTimer;

  