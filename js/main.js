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

////////////////////
// ORGANIZER + LOCAL
////////////////////

// Painting Class: Represents a Painting
class Painting {
	constructor(title, artist, id, year) {
		this.title = title;
		this.artist = artist;
		this.id = id;
		this.year = year;

	}
}

// UI Class: Handle UI Tasks
class UI {
	static displayPaintings() {
		const paintings = Store.getPaintings();

		paintings.forEach((painting) => UI.addPaintingToList(painting));
	}

	static addPaintingToList(painting) {
		const list = document.querySelector('#painting-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${painting.title}</td>
			<td>${painting.artist}</td>
			<td>${painting.year}</td>
			<td>1st</td>
			<td>Modernism</td>
			<td><i class="small material-icons pointer" style="color: #424242;">image</i></td>
			<td><i class="small material-icons pointer" style="color: #9E9E9E;">audiotrack</i></td>
			<td>${painting.id}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

		list.appendChild(row);
	}

	static deletePainting(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('#organizer-container');
		const form = document.querySelector('#painting-form');
		container.insertBefore(div, form);

		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}

	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#artist').value = '';
		document.querySelector('#year').value = '';
		document.querySelector('#id').value = '';
	}
}

// Store Class: Handles Storage
class Store {
	static getPaintings() {
		let paintings;
		if (localStorage.getItem('paintings') === null) {
			paintings = [];
		} else {
			paintings = JSON.parse(localStorage.getItem('paintings'));
		}

		return paintings;
	}

	static addPainting(painting) {
		const paintings = Store.getPaintings();
		paintings.push(painting);
		localStorage.setItem('paintings', JSON.stringify(paintings));
	}

	static removePainting(id) {
		const paintings = Store.getPaintings();

		paintings.forEach((painting, index) => {
			if (painting.id === id) {
				paintings.splice(index, 1);
			}
		});

		localStorage.setItem('paintings', JSON.stringify(paintings));
	}
}

// Event: Display Paintings
document.addEventListener('DOMContentLoaded', UI.displayPaintings);

// Event: Add a Painting
document.querySelector('#painting-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();

	// Get form values
	const title = document.querySelector('#title').value;
	const artist = document.querySelector('#artist').value;
	const year = document.querySelector('#year').value;
	const id = document.querySelector('#id').value;

	// Validate
	if (title === '' || artist === '' || year === '' || id === '') {
		UI.showAlert('Please fill in all fields', 'danger');
	} else {
		// Instatiate painting
		const painting = new Painting(title, artist, year, id);

		// Add Painting to UI
		UI.addPaintingToList(painting);

		// Add painting to store
		Store.addPainting(painting);

		// Show success message
		UI.showAlert('Painting Added', 'success');

		// Clear fields
		UI.clearFields();
	}
});

// Event: Remove a Painting
document.querySelector('#painting-list').addEventListener('click', (e) => {
	// Remove painting from UI
	UI.deletePainting(e.target);

	// Remove painting from store
	Store.removePainting(e.target.parentElement.previousElementSibling.textContent);

	// Show success message // Currently not targeting the X button, is targeting the entire div
	// UI.showAlert('Painting Removed', 'success');
});

// ADD IMG AND AUDIO BUTTONS

const realFileBtn = document.getElementById('real-file-img');
const customBtn = document.getElementById('btn-organizer-add-img');
const customTxt = document.getElementById('custom-text');

customBtn.addEventListener('click', function () {
	realFileBtn.click();
});

realFileBtn.addEventListener('change', function () {
	if (realFileBtn.value) {
		customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
	} else {
		customTxt.innerHTML = 'No file chosen, yet.';
	}
});

const realFileBtn2 = document.getElementById('real-file-audio');
const customBtn2 = document.getElementById('btn-organizer-add-audio');
const customTxt2 = document.getElementById('custom-text-audio');

customBtn2.addEventListener('click', function () {
	realFileBtn2.click();
});

realFileBtn2.addEventListener('change', function () {
	if (realFileBtn2.value) {
		customTxt2.innerHTML = realFileBtn2.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
	} else {
		customTxt2.innerHTML = 'No file chosen, yet.';
	}
});
