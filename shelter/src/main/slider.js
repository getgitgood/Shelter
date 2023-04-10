const body = document.querySelector('body');
const slider = document.querySelector('.slider-items');
const prevContainer = document.querySelector('.prev-items');
const currContainer = document.querySelector('.curr-items');
const nextContainer = document.querySelector('.next-items');
const buttonLeft = document.querySelector('.button-pagi--prev');
const buttonRight = document.querySelector('.button-pagi--next');

function getRandom () {
  return Math.round(Math.random() * 7)
}

function getCardsNumber() {
    let sliderStyles = window.getComputedStyle(slider);
    let sliderColGap = parseInt(sliderStyles.columnGap)
    const CARD_WIDTH = 260 + sliderColGap * 2;
    return Math.round(slider.offsetWidth / CARD_WIDTH);
}

let [prevArr, currArr, nextArr]  = [[], [], []];

function nextArrFill(cardsTotal) {
  while (nextArr.length < cardsTotal) {
    let random = getRandom()
    if (currArr.indexOf(random) === -1 && nextArr.indexOf(random) === -1) {
      nextArr.push(random)
    }
    getRandom();
  }
}

function prevArrFill(cardsTotal) {
  while (prevArr.length < cardsTotal) {
    let random = getRandom()
    if (currArr.indexOf(random) === -1 && prevArr.indexOf(random) === -1) {
      prevArr.push(random)
    }
    getRandom();
  }
}

function initArrays(cardsTotal) {
  nextArrFill(cardsTotal);
  currArr = [...nextArr];
  nextArr = [];
  nextArrFill(cardsTotal)
  prevArr = [...currArr];
  currArr = []
  currArr = [...nextArr]
  nextArr = []
  nextArrFill(cardsTotal);
  return [prevArr, currArr, nextArr]
} 

initArrays(getCardsNumber())


function forward(cardsTotal) {
  prevArr = []
  prevArr = [...currArr];
  currArr = [...nextArr]
  nextArr = [];
  nextArrFill(cardsTotal)
}

function backward(cardsTotal) {
  nextArr = []
  nextArr = [...currArr];
  currArr = [...prevArr];
  prevArr = [];
  prevArrFill(cardsTotal)
}

// function changeToForward(cardsTotal) {
//   let temp = [...currArr];
//   currArr = [...prevArr];
//   prevArr = [...temp];
//   nextArr = [];
//   nextArrFill(cardsTotal)
// }

// function changeToBackward(cardsTotal) {
//   let temp = [...currArr];
//   currArr = [...nextArr];
//   nextArr = [...temp];
//   prevArr = [];
//   prevArrFill(cardsTotal)
// }

function constructCards(data, ...arr) {
  let itemContainer = currContainer;
  prevContainer.innerHTML = '';
  nextContainer.innerHTML = '';
  currContainer.innerHTML = '';
  arr.forEach(item => {
    if (item === prevArr) {
      itemContainer = prevContainer
    }
    if (item === nextArr) {
      itemContainer = nextContainer
    }
    if (item === currArr) {
      itemContainer = currContainer
    }
    item.forEach(num => {
      const name = data[num].name;
      const img = data[num].img;
      const html = `
      <div data-id=${num} class="pets-item">
        <img src="${img}" alt="pet_${name}" class="pets-image">
        <span class="pets-item-name">${name}</span>
        <button class="button button--secondary">Learn more</button>
      </div>`;
      itemContainer.insertAdjacentHTML("afterbegin", html)
    })
  })
}
window.addEventListener('resize', () => {
  if (window.screen.width < 735) {
    constructCards(null, prevArr, currArr, nextArr)
  } 
})
let dataSet;
fetch('./src/pets_info.json')
  .then(response => response.json())
  .then(data => {
    dataSet = data;
    constructCards(data, prevArr, currArr, nextArr);
    buttonRight.addEventListener('click', (e) => {
      e.preventDefault()
      forward(getCardsNumber())
      slider.classList.add('transition-right');
    });
    buttonLeft.addEventListener('click', (e) => {
      e.preventDefault()
      backward(getCardsNumber())
      slider.classList.add('transition-left')
    })
    slider.addEventListener('animationend', (e) => {
      if (e.animationName === "move-left") {
        slider.classList.remove('transition-left');
        constructCards(data, prevArr, currArr, nextArr);
      } else {
        slider.classList.remove('transition-right')
        constructCards(data, prevArr, currArr, nextArr);
      }
    })
  })
  
  .catch(error => console.log(error))

let resizeTimer;

window.addEventListener('resize', function() {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.screen.width < 735) {
        initArrays(getCardsNumber())
      } else if (window.screen.width < 930) { 
        initArrays(getCardsNumber())
      } else {
        initArrays(getCardsNumber())
      }
      constructCards(dataSet, prevArr, currArr, nextArr)
  }, 75);
  })}
);
