let APIkey = 'c696fb2bafb493501053fbb514ef2435';

function searchFlickr() {
    const searchText = document.getElementById('typewriter').value;

    if (searchText.trim() === '') {
        alert('Please enter a search term.');
        return;
    }

    const flickrApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIkey}&text=${searchText}&format=json&nojsoncallback=1`;

    fetch(flickrApiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.photos.photo);
        })
        .catch(error => {
            console.error('Error fetching Flickr data:', error);
        });
}

function displayImages(photos) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';

    photos.forEach(photo => {
        const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = photo.title;

        imageContainer.appendChild(imageElement);
    });
}

/////////////////////////////////////////////////
//////////// Typewriter ////////////////////////
///////////////////////////////////////////////

// JavaScript
var typeWriterElement = document.getElementById('typewriter');
typeWriterElement.placeholder = "";

var textArray = ["Cats", "Dogs", "Cars", "Beach"];
var animationInProgress = true; // Flag to track if animation is in progress

function animateText(text, i, direction) {
    if (!animationInProgress) return;

    typeWriterElement.value = text.substring(0, i);

    var delay = direction === 'typing' ? 250 - Math.random() * 100 : 10 + Math.random() * 100;

    setTimeout(function () {
        if (direction === 'typing') {
            if (i < text.length + 1) {
                animateText(text, i + 1, 'typing');
            } else {
                // After typing, initiate deleting and move to the next word
                animateText(text, i - 1, 'deleting');
            }
        } else if (direction === 'deleting') {
            if (i > 0) {
                animateText(text, i - 1, 'deleting');
            } else {
                // After deleting, move to the next word
                var currentIndex = textArray.indexOf(text);
                var nextIndex = (currentIndex + 1) % textArray.length;
                animateText(textArray[nextIndex], 0, 'typing');
            }
        }
    }, delay);
}

function startWriter(i) {
    if (typeof textArray[i] === 'undefined') return;

    animateText(textArray[i], 0, 'typing');
}

// Add event listeners for input, focus, and blur events
typeWriterElement.addEventListener('input', function () {
    // If the user interacts with the search box, stop the animation
    animationInProgress = false;
});

typeWriterElement.addEventListener('focus', function () {
    // Clear the text instantly and stop the animation
    typeWriterElement.value = '';
    animationInProgress = false;
});

typeWriterElement.addEventListener('blur', function () {
    // Restart the animation when the element loses focus (click outside the box)
    animationInProgress = true;
    startWriter(0);
});

// Initial start after a delay
setTimeout(function () {
    startWriter(0);
}, 1000);
