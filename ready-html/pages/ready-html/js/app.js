let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const markerWrapper = document.querySelector('.marker-wrapper');
const activeSlide = document.querySelector('.active-slide');

let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

function lerp(start, end, factor) {
	return start + (end - start) * factor;
}

function updateActiveSliderNumber(markerMove, markerMaxMove) {
	const partWidth = markerMaxMove / 20;
	let currentPart = Math.round((markerMove - 140) / partWidth) + 1;
	currentPart = Math.min(20, currentPart);
	activeSlide.textContent = `${currentPart}/20`;
}

function update() {
	current = lerp(current, target, ease);

	gsap.set(".slider-wrapper", { x: -current,});
	let moveRatio = current / maxScroll;
	let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
	let markerMove = 140 + markerMaxMove * moveRatio;
	gsap.set(".marker-wrapper", { x: markerMove,});

	updateActiveSliderNumber(markerMove, markerMaxMove);
	requestAnimationFrame(update);
}

window.addEventListener("resize", () => {
	maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
});

window.addEventListener("wheel", (e) => {
	target += e.deltaY;
	target = Math.max(0, target);
	target = Math.min(target, maxScroll);
});

update();