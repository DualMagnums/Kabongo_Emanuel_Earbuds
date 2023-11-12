//XRAY SLIDER

(function(){
    "use strict";


var imageCon = document.querySelector('#imageCon'),
    drag = document.querySelector('.image-drag'),
    left = document.querySelector('.image-left'),
    dragging = false,
    min = 0,
    max = imageCon.offsetWidth;

function onDown() {
  dragging = true;
}

function onUp() {
  dragging = false;
}

function onMove(event) {
  if(dragging===true) {
    var x = event.clientX - imageCon.getBoundingClientRect().left;
    console.log(event.clientX);
    console.log(imageCon.getBoundingClientRect().left);
    if(x < min) {
      x = min;
    }
   else if(x > max) {
      x = max-4;}

    drag.style.left = x + 'px';
    left.style.width = x + 'px';
  }
}

drag.addEventListener('mousedown', onDown, false);
document.body.addEventListener('mouseup', onUp, false);
document.body.addEventListener('mousemove', onMove, false);


})();

//SCROLL ANIMATION

const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;
const frameCount = 450;
const images = [];
const buds = {
    frame: 0
};

for (let i=0; i<frameCount; i++) {

    const img = document.createElement("img");
    img.src = `images/explode_${(i+1).toString().padStart(4, '0')}.jpg`;
    images.push(img);
}
gsap.to(buds, {
    frame: 449,
    snap: "frame",
    scrollTrigger: {
        trigger: "#explode-view",
        pin: true,
        scrub: 1,
        start: "top top",
        markers: true
    },
    onUpdate: render
})

images[0].addEventListener("onload", render);

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
};

//SCROLL TO

gsap.registerPlugin(ScrollToPlugin);

const navLinks = document.querySelectorAll("#main-header nav ul li a")

function scrollLink(e) {
    e.preventDefault();
    let selectedLink = e.currentTarget.hash;
    gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100}})
}

navLinks.forEach((navLink)=>{
    navLink.addEventListener("click", scrollLink)
});