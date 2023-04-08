const hambButton = document.querySelector('.hamb-menu-btn');
const hambMenu = document.querySelector('.hamb-menu-popup');
const hambMenuContent = document.querySelector('.menu-popup-content');
const menu = document.querySelector('.header-nav-menu').cloneNode(1);
const body = document.querySelector('body');

function renderMenu() {
  hambButton.classList.add('clicked');
  hambMenu.classList.add('open');
  hambMenuContent.classList.add('open')
  body.classList.add('noscroll');
  hambMenuContent.appendChild(menu);
}

function hideMenu() {
  hambButton.classList.remove('clicked');
  hambMenu.classList.remove('open');
  hambMenuContent.classList.remove('open');
  body.classList.remove('noscroll');
}

function hambHandler (e) {
  e.preventDefault();
  if (hambButton.classList.contains('clicked')) {
    hideMenu()
  } else {
    renderMenu();
  }
} 


hambButton.addEventListener('click', hambHandler);

hambMenu.addEventListener('click', (e) => {
  console.log(e.target)
  if (e.target != hambMenuContent && e.target != menu) {
    hideMenu()
  }
})

// menu.forEach.addEventListener('click', () => {
//   hideMenu()
// })

// smooth transition when browsing to other page

