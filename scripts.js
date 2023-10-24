let textDisplay = document.getElementById("translatedText");
let charButtons = document.getElementsByClassName("icon-button");
let spaceButton = document.getElementById("spaceButton");
let deleteButton = document.getElementById("deleteButton");
let restartButton = document.getElementById("restartButton");
let translatedText = "";

for (let i = 0; i < charButtons.length; i++) {
  let char = charButtons[i].getAttribute("name");
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

function displayWarning() {
  let spoilerContainer = document.createElement("div");
  spoilerContainer.style.cssText = `top:0px;position: fixed;width: 100vw;height: 100vh;display:flex; aligh-items: center; justify-content: center`;
  spoilerContainer.setAttribute("id", "spoiler-container");
  document.body.appendChild(spoilerContainer);

  let fuzzyCover = document.createElement("div");
  fuzzyCover.classList.add("fuzzy-cover");
  spoilerContainer.appendChild(fuzzyCover);

  let spoilerBox = document.createElement("div");
  spoilerBox.classList.add("bordered-container", "spoiler-box");
  spoilerContainer.appendChild(spoilerBox);

  //add title
  let title = document.createElement("h1");
  title.innerHTML = "SPOILER";
  spoilerBox.appendChild(title);

  let description = document.createElement("p");
  description.innerHTML =
    "This translator is intended for those who have already deciphered the language in the game “Fez”. If you have not already done so, I encourage you to go back and attempt it yourself. It’s part of the fun!";
  spoilerBox.appendChild(description);

  let spoilerButton = document.createElement("button");
  spoilerButton.classList.add("text-button");

  spoilerButton.innerHTML = "CONTINUE";
  spoilerButton.addEventListener("click", removeWarning);
  spoilerBox.appendChild(spoilerButton);

  //add description
  //add continue button
}

function removeWarning() {
  localStorage.setItem("visited", true);
  document.getElementById("spoiler-container").remove();
}

if (!localStorage.getItem("visited")) {
  displayWarning();
}
