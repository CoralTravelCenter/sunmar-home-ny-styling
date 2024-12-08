import markup from './markup.html?raw';
import tooltipMarkup from './tolltip.html?raw';
import './ukrasheniya.css'
import './ded.css'
import './tooltip.css'


const block = document.querySelector('.menu').parentElement;
const root = document.documentElement;
let reachedMiddle = false;

// HTML Markup for Santa and Tooltip
block.insertAdjacentHTML('beforeend', markup);
const path = document.getElementById('path');
const santa = document.getElementById('santa');
santa.insertAdjacentHTML('beforeend', tooltipMarkup)

// Initialize animation
function initAnimation() {
	setTimeout(() => {
		startAnimation();
	}, 2000);
}

// Start animation
function startAnimation() {
	path.classList.add('animated');
	reachedMiddle = false;
}

// Stop animation
function stopAnimation() {
	santa.classList.add('stop');
	path.classList.add('stop');
}

// Resume animation
function resumeAnimation() {
	santa.classList.remove('stop');
	path.classList.remove('stop');
}

// Update block width for adaptive animation
function updateBlockWidth() {
	const blockWidth = block.offsetWidth;
	root.style.setProperty('--block-width', `${blockWidth}px`);
}

// Check Santa's position relative to the block
function checkPosition() {
	const santaRect = path.getBoundingClientRect();
	const blockRect = block.getBoundingClientRect();

	const santaCenter = santaRect.left + santaRect.width / 2;
	const blockCenter = blockRect.left + blockRect.width / 2;

	if (santaCenter >= blockCenter && !reachedMiddle) {
		showTooltip();
		reachedMiddle = true;
	} else {
		return
	}
}

// Show tooltip
function showTooltip() {
	const tooltip = document.getElementById('ded-tooltip');
	tooltip.classList.add('tooltip-active')
	stopAnimation()
	tooltip.addEventListener('click', () => {
		resumeAnimation()
		tooltip.classList.remove('tooltip-active')
	})

//	 Auto-close tooltip after 5 seconds
	setTimeout(() => {
		tooltip.classList.remove('tooltip-active')
		resumeAnimation()
	}, 5000);
}

// Restart animation cycle
function handleAnimationEnd() {
	path.classList.remove('animated');
	setTimeout(() => {
		startAnimation();
	}, 5000); // Restart after 5 seconds
}

// Event listeners
window.addEventListener('load', initAnimation);
window.addEventListener('resize', () => {
	updateBlockWidth();
	checkPosition();
});
path.addEventListener('animationiteration', checkPosition);
path.addEventListener('animationend', handleAnimationEnd);

// Initial setup
updateBlockWidth();



