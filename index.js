// Register Service worker to control making site work offline
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('app.js')
	.then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop
let deferredPrompt;
const pwaBtn = document.querySelector('.pwa-btn');
var PwaKey = 'pwa-modal';
var PwaValue = getCookie(PwaKey);
//pwaBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	//pwaBtn.style.display = 'block';
	if(!PwaValue)
	{
		setTimeout(function(){
			jQuery('.pwa-offcanvas').addClass('show');
			jQuery('.pwa-backdrop').addClass('fade show');
		}, 3000);
	}
	pwaBtn.addEventListener('click', () => {
		// hide our user interface that shows our A2HS button
		//pwaBtn.style.display = 'none';
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				jQuery('.pwa-offcanvas').slideUp(500, function() {
					jQuery(this).removeClass('show');
				});
				setTimeout(function(){
					jQuery('.pwa-backdrop').removeClass('show');
				}, 500);
				setCookie(PwaKey, false);
			}
			deferredPrompt = null;
		});
	});
});

jQuery('.pwa-backdrop, .pwa-close, .pwa-btn').on('click',function(){
	jQuery('.pwa-offcanvas').slideUp(500, function() {
		jQuery(this).removeClass('show');
	});
	setTimeout(function(){
		jQuery('.pwa-backdrop').removeClass('show');
	}, 500);
	setCookie(PwaKey, true);
});
