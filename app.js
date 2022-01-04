var box = document.querySelector("body");
var pageX = document.getElementById("x");
var pageY = document.getElementById("y");

function updateDisplay(event) {
  pageX.innerText = event.pageX;
  pageY.innerText = event.pageY;
}

box.addEventListener("mousemove", updateDisplay, false);
box.addEventListener("mouseenter", updateDisplay, false);
box.addEventListener("mouseleave", updateDisplay, false);

var element = document.querySelector('body');
var elementwo = document.querySelector('header');
var elementhree = document.querySelector('.layout_container_bottom')


window.addEventListener('load', loader);

function loader(){

    const TLLOAD = gsap.timeline();

    TLLOAD
    .to('.bloc-txt', {
        height: 'auto', 
        duration: 0.6, 
        delay: 0.4, 
        ease: 'power2.out'
    },)

    .to('.bloc-txt h2', {
        y: 0, 
        ease: 'power2.out'
    }, '-=0.6')

    .to('.loader_circle', {
        x:0, 
        duration: 0.6, 
        ease: 'power2.out'
    },'-=0.4')

    .to('.load-container', {
        opacity: 0, 
        duration: 0.8, 
        delay: 0.7
    })
    .add(() => {
        document.querySelector('.load-container').style.display = "none";
    })
} 




class HoverButton {
  constructor(el) {
    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }
  
  attachEventsListener() {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', e => this.calculatePosition(e));
  }
  
  calculatePosition() {
    gsap.set(this.el, {
      x: 0,
      y: 0,
      scale: 1
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + (box.width * 0.5);
    this.y = box.top + (box.height * 0.5);
    this.width = box.width;
    this.height = box.height;
  }
  
  onMouseMove(e) {
    let hover = false;
    let hoverArea = (this.hover ? 0.7 : 0.5);
    let x = e.clientX - this.x;
    let y = e.clientY - this.y;
    let distance = Math.sqrt( x*x + y*y );
    if (distance < (this.width * hoverArea)) {
       hover = true;
        if (!this.hover) {
          this.hover = true;
        }
        this.onHover(e.clientX, e.clientY);
    }
    
    if(!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }
  
  onHover(x, y) {
    gsap.to(this.el,  {
      x: (x - this.x) * 0.4,
      y: (y - this.y) * 0.4,
      scale: 1.15,
      ease: 'power2.out',
      duration: 0.4
    });
    this.el.style.zIndex = 10;
  }
  onLeave() {
    gsap.to(this.el, {
      x: 0,
      y: 0,
      scale: 1,
      ease: 'elastic.out(1.2, 0.4)',
      duration: 0.7
    });
    this.el.style.zIndex = 1;
  }
}

// const btn1 = document.querySelector('.logo a h1');
// new HoverButton(btn1);

const btnOpen = document.querySelector('.menu_btn svg');
new HoverButton(btnOpen);

const btn3 = document.querySelector('.dark_mode_btn a');
new HoverButton(btn3);

const btnExit = document.querySelector('.overlay .exit');
new HoverButton(btnExit);


const overlay = document.querySelector('.overlay')

var tlMenu = gsap.timeline({defaults:{duration: 1, ease: Back.easeOut.config(2)}})

tlMenu.paused(true);
tlMenu.to(".overlay", {clipPath: 'circle(100%'})

tlMenu.from('.overlay_container nav li a', {
	duration:1.3,
	y:"100%",
	stagger: 0.2,
	ease: 'Expo.easeInOut'
});

tlMenu.from('.social-links li', {
	duration:1,
	y:"-100%",
	opacity:0,
	stagger: 0.1,
	ease: 'Expo.easeInOut'
} , "-=0.5");

tlMenu.from('.overlay .exit i', {
	duration:1,
	y:"-100%",
	opacity:0,
	stagger: 0.1,
	ease: 'Expo.easeInOut'
}, "-=0.8");

btnOpen.addEventListener('click', () => {
  tlMenu.play();
})
btnExit.addEventListener('click', () => {
  tlMenu.reverse();
})