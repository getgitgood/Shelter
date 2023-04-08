const slider = document.querySelector('.slider-items');
const sliderItem = document.querySelector('.pets-item')
const buttonLeft = document.querySelector('.button-pagi--prev');
const buttonRight = document.querySelector('.button-pagi--next');

function getRandom () {
  return Math.round(Math.random() * 7)
}

function getCardsNumber() {
  let sliderStyles= window.getComputedStyle(slider);
  let sliderColGap = parseInt(sliderStyles.columnGap)
  const CARD_WIDTH = 270 + sliderColGap * 2;
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


// function prevArrFill(cardsTotal) {
//   prevArr = [...nextArr];
//   nextArr = []
//   nextArrFill(cardsTotal)
// }

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

function changeToBackward(cardsTotal) {
  let temp = [...currArr];
  currArr = [...prevArr];
  prevArr = [...temp];
  nextArr = [];
  nextArrFill(cardsTotal)
}

changeToBackward(getCardsNumber())
buttonRight.addEventListener('click', (e) => {
  e.preventDefault()
  forward(getCardsNumber())
  console.log(prevArr, currArr, nextArr)
})

buttonLeft.addEventListener('click', (e) => {
  e.preventDefault()
  backward(getCardsNumber())
  console.log(prevArr, currArr, nextArr)
})

// console.log(prevArr, currArr, nextArr)
fetch('./src/pets_info.json')
  .then(response => response.json())
  .then(data => {
    // console.log(data[7])
  })
  .catch(error => console.log(error))

