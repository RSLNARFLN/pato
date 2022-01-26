var btn = document.querySelector('.burgerbtn');
var exit = document.querySelector('.exit');
var sidemenu = document.querySelector('aside');

btn.addEventListener('click', Burger);
exit.addEventListener('click', Burger);

function Burger() {
  sidemenu.classList.toggle("active");
  // console.log("toggled");
}