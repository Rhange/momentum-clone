const body = document.querySelector("body");

const IMG_NUMBER = 13;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.append(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

const handleCM = (e) => e.preventDefault();

function init() {
  const randomNumber = genRandom();

  paintImage(randomNumber);
  body.addEventListener("contextmenu", handleCM);
}

init();
