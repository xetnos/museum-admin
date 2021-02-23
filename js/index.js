// Nav Bar on MObile
$(document).ready(function () {
	$('.sidenav').sidenav();
});

// Select Floors
$(document).ready(function () {
	$('select').formSelect();
});

// Hide Sections
$('.section').hide();

setTimeout(function () {
	$(document).ready(function () {
		// Show sections
		$('.section').fadeIn();

		// Hide preloader
		$('.loader').fadeOut();
	});
}, 1000);

// Side Nav
$(document).ready(function () {
	$('.sidenav').sidenav();
});
