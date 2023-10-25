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
  title.innerHTML = "SPOILER ALERT!";
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
}

function removeWarning() {
  localStorage.setItem("visited", true);
  document.getElementById("spoiler-container").classList.add("zoom-dissapear");
  setTimeout(() => {
    document.getElementById("spoiler-container").remove();
  }, 500);
}

if (!localStorage.getItem("visited")) {
  displayWarning();
}

//save entry

let saveBtn = document.getElementById("saveButton");
saveBtn.addEventListener("click", () => {
  if (!translatedText) return;

  //checklocalStorage
  let entries = retrieveEntries();

  let entry = {
    id: entries.length + 1,
    text: translatedText,
    date: Date.now(),
  };

  entries.push(entry);
  saveEntries(entries);

  translatedText = "";
  textDisplay.innerHTML = translatedText;

  updateEntriesDisplay();
});

function retrieveEntries() {
  let json = localStorage.getItem("entries");
  if (!json) return [];
  let entries = JSON.parse(json);
  return entries;
}

function updateEntriesDisplay() {
  let entries = retrieveEntries();
  console.log(entries);

  //get entry display
  let entriesDisplay = document.getElementById("entries-container");
  entriesDisplay.innerHTML = "";
  for (let entry of entries) {
    let entryDiv = createHTMLEntry(entry);
    entriesDisplay.appendChild(entryDiv);
  }
  //loop through entries create entry child
}
function createHTMLEntry(entry) {
  let entryDiv = document.createElement("div");
  entryDiv.classList.add("entry");

  //text
  let textDiv = document.createElement("div");
  textDiv.innerHTML = `"${entry.text}"`;
  entryDiv.appendChild(textDiv);

  let delEntry = document.createElement("div");
  delEntry.innerHTML = "X";
  delEntry.classList.add("del-entry-btn");
  delEntry.addEventListener("click", () => {
    deleteEntry(entry.id);
  });
  entryDiv.appendChild(delEntry);
  return entryDiv;
}

let deleteEntry = (id) => {};

let saveEntries = (entries) => {
  let json = JSON.stringify(entries);
  localStorage.setItem("entries", json);
};

updateEntriesDisplay();
