let APIkey = "c696fb2bafb493501053fbb514ef2435";

////////////////////////////////////////////////
///// Search bar
///////////////////////////////////////////////

function searchFlickr() {
  const searchText = document.getElementById("typewriter").value;

  console.log("Search text is:", searchText);

  if (searchText.trim() === "") {
    alert("Please enter a search term.");
    return;
  }

  const flickrApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIkey}&text=${searchText}&sort=relevance&format=json&nojsoncallback=1`;

  fetch(flickrApiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayImages(data.photos.photo);
    })
    .catch((error) => {
      console.error("Error fetching Flickr data:", error);
    });
}

let input = document.getElementById("typewriter");
let submitButton = document.querySelector(".search-bar__submit");
let typeWriterElement = document.getElementById("typewriter");
let animationInProgress = true;

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchFlickr();
  }
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchFlickr();
});

////////////////////////////////////////////////
///// Lightbox
///////////////////////////////////////////////

function displayLightbox(imageUrl, title) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const lightboxImage = document.createElement("img");
  lightboxImage.src = imageUrl;
  lightboxImage.alt = title;

  overlay.appendChild(lightboxImage);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  document.body.appendChild(overlay);
}

//
// Image gallery
//

function displayImages(photos) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  photos.forEach((photo) => {
    const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = photo.title;

    imageElement.addEventListener("click", () => {
      displayLightbox(imageUrl, photo.title);
    });

    imageContainer.appendChild(imageElement);
  });
}

////////////////////////////////////////////////
///// Typewriter Effect
///////////////////////////////////////////////

let textArray = ["Cats", "Dogs", "Cars", "Beach"];

function animateText(text, i, direction) {
  if (!animationInProgress) return;

  typeWriterElement.value = text.substring(0, i);

  let delay =
    direction === "typing"
      ? 250 - Math.random() * 100
      : 10 + Math.random() * 100;

  setTimeout(function () {
    if (direction === "typing") {
      if (i < text.length + 1) {
        animateText(text, i + 1, "typing");
      } else {
        animateText(text, i - 1, "deleting");
      }
    } else if (direction === "deleting") {
      if (i > 0) {
        animateText(text, i - 1, "deleting");
      } else {
        let currentIndex = textArray.indexOf(text);
        let nextIndex = (currentIndex + 1) % textArray.length;
        animateText(textArray[nextIndex], 0, "typing");
      }
    }
  }, delay);
}

function startWriter(i) {
  if (typeof textArray[i] === "undefined") return;

  animateText(textArray[i], 0, "typing");
}

typeWriterElement.addEventListener("input", function () {
  animationInProgress = false;
});

typeWriterElement.addEventListener("focus", function () {
  if (animationInProgress) {
    typeWriterElement.value = "";
  }
  animationInProgress = false;
});

typeWriterElement.addEventListener("blur", function () {
  animationInProgress = false;
});

setTimeout(function () {
  startWriter(0);
}, 1000);
