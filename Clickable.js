// Venter til hele HTML-dokumentet er ferdig lastet før koden kjøres
document.addEventListener('DOMContentLoaded', function() {
	// Henter første element med klassen 'triangle' (trekanten)
	const circle = document.querySelector('.triangle');
	// Henter containeren (grønn firkant) som har klassen 'center-square'
	const container = document.querySelector('.center-square');
	// Sjekker at både sirkel og container finnes før vi prøver å bruke dem
	if (circle && container) {
		// Legger til onclick-event på sirkelen
		// Når brukeren klikker på sirkelen, flyttes den til en tilfeldig posisjon og teller opp
		let timerStarted = false; // Flag to check if the timer has started
		circle.onclick = function() {
			// Start timeren første gang sirkelen trykkes
			if (!timerStarted && typeof window.startCountdown === 'function') {
				window.startCountdown();
				timerStarted = true; // Set the flag to true after starting the timer
			}
			// Kaller funksjon i 10Seconds.html for å telle antall klikk
			if (typeof window.incrementCircleClicks === 'function') window.incrementCircleClicks();
			// Flytter sirkelen til ny posisjon
			moveToRandomPosition(circle, container);
		};
	}
});

/**
 * Flytter sirkelen til en tilfeldig posisjon innenfor containeren
 * @param {HTMLElement} circle - Sirkelelementet som skal flyttes
 * @param {HTMLElement} container - Containeren (grønn firkant) sirkelen skal holde seg innenfor
 */
function moveToRandomPosition(circle, container) {
	// Henter bredden og høyden til containeren (grønn firkant)
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;
	// Henter bredden og høyden til trekanten
	const circleWidth = circle.offsetWidth;
	const circleHeight = circle.offsetHeight;

	// Fordi transform: translate(-50%, -50%) brukes, må vi sørge for at midtpunktet aldri er nærmere kanten enn radiusen
	// minLeft/minTop er halvparten av sirkelens bredde/høyde, så hele sirkelen holder seg innenfor
	const minLeft = circleWidth / 2;
	const maxLeft = containerWidth - circleWidth / 2;
	const minTop = circleHeight / 2;
	const maxTop = containerHeight - circleHeight / 2;

	// Genererer en tilfeldig posisjon for midtpunktet til sirkelen innenfor containeren
	const left = Math.random() * (maxLeft - minLeft) + minLeft;
	const top = Math.random() * (maxTop - minTop) + minTop;

	// Setter ny posisjon (midtpunktet til sirkelen) med px-enhet
	circle.style.left = left + 'px';
	circle.style.top = top + 'px';
	// Beholder transform: translate(-50%, -50%) slik at left/top er midtpunktet
	circle.style.transform = 'translate(-50%, -50%)';

	
}
