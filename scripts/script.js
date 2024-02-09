let APIkey = "c696fb2bafb493501053fbb514ef2435";

function searchFlickr() {
  const searchText = document.getElementById("searchInput").value;

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

// Gör att man kan söka genom att trycka Enter
var input = document.getElementById("searchInput");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".search-button").click();
  }
});

// Eventlistener för sök-knappen
document
  .querySelector(".search-button")
  .addEventListener("click", searchFlickr);

function displayImages(photos) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  photos.forEach((photo) => {
    const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = photo.title;

    imageContainer.appendChild(imageElement);
  });
}
