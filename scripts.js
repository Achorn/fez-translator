let textDisplay = document.getElementById("translatedText");
let charButtons = document.getElementsByClassName("icon-button");
let spaceButton = document.getElementById("spaceButton");
let deleteButton = document.getElementById("deleteButton");
let restartButton = document.getElementById("restartButton");
let translatedText = "";

for (let i = 0; i < charButtons.length; i++) {
  let char = charButtons[i].childNodes[1].getAttribute("name");
  charButtons[i].addEventListener("click", (e) => addCharToString(char));
}

spaceButton.addEventListener("click", (e) => addCharToString(" "));

deleteButton.addEventListener("click", (e) => {
  translatedText = translatedText.slice(0, -1);
  textDisplay.innerHTML = translatedText;
});
restartButton.addEventListener("click", (e) => {
  translatedText = "";
  textDisplay.innerHTML = translatedText;
});

function addCharToString(char) {
  translatedText += char;
  textDisplay.innerHTML = translatedText;
}