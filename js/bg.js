//API KEY My
const UNSPLASH_API_KEY = "qj7dzHsl9c4JwJRBlshnyjsFQechd9tsVoBpoG8_D0k";

// UNSPLASH_URL
const UNSPLASH_URL = `https://api.unsplash.com/photos/randoms/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const locationContainer = document.querySelector(
  ".js-location .location__text"
);
const body = document.querySelector("body");

function loadBackground() {
  // get image from Local Storage
  const savedImage = localStorage.getItem("background");

  console.log("savedImage:", savedImage);

  if (savedImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();

    console.log("parsedImage.expiresOn: ", parsedImage.expiresOn);
    console.log("today:", today);
    if (today > parsedImage.expiresOn) {
      getBackground();
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),
         rgba(0, 0, 0, 0.4)), url(${parsedImage.url})`;
      locationContainer.innerHTML = `${parsedImage.naem}, 
    ${parsedImage.city}, ${parsedImage.country}`;
    }
  }
  return;
}

function saveBackground(imageUrl, city, country, name) {
  // Get from Local Storage
  const saveImage = localStorage.getItem("background");

  if (saveImage !== null) {
    // Remove to Local Stroage
    localStorage.removeItem("background");
  } else {
    console.log("saveBackground ERROR ?");
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  const imageObject = {
    url: imageUrl,
    expiresOn: expirationDate,
    city: city,
    country: country,
    name: name,
  };
  //Set to Local Storage wit JSON strng
  localStorage.setItem("background", JSON.stringify(imageObject));
  loadBackground();

  return;
}

function paintOfflineImage(imgNumber) {
  const image = new Image();
  // image.src = `./images/1.jpg`;
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const body = document.querySelector("body");
  const IMAGES_NUMBER = 5;
  const number = Math.floor(Math.random() * IMAGES_NUMBER);
  return number;
}

function getBackground() {
  fetch(UNSPLASH_URL)
    .then((response) => response.json())
    .then((json) => {
      const image = json;

      if (image.url && image.urls.full && image.location) {
        const imageUrl = image.urls.full;

        const location = image.location;
        const city = location.city;
        const country = location.country;
        const name = location.name;

        saveBackground(imageUrl, city, country, name);
      } else {
        console.log("getBackground ERROR or Offline  ?");

        //1. Online ,Recursion
        // getBackground();

        //2. Offline
        const randomNumber = genRandom();
        paintOfflineImage(randomNumber);
      }
    });
  return;
}

function initApp() {
  loadBackground();
}

initApp();
