"use strict";
window.addEventListener("load", main);

/* =========== Global consts and main func =========== */
const characterContainer = document.querySelector("#characters");
const dialogContainer = document.querySelector("#dialog-grid");
async function main() {
    const characters = await fetchData();
    showAllCharacters(characters);
}

/* =========== Fetch character data =========== */
async function fetchData() {
    const DATA_URL = "data/southpark.json";
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error("Network response not ok")
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        throw new Error(err);
    }
}

/* =========== Display character data =========== */
function showAllCharacters(data) {
    for (const obj of data) {
        showCharacter(obj);
    } 
}
function showCharacter(obj) {
    const myHTML = /*html*/ `
        <article>
            <img src=${obj.image}>
            <h2>${obj.name}</h2>
            <p>${obj.role}</p>
        </article>
    `;
    characterContainer.insertAdjacentHTML("beforeend", myHTML);
    characterContainer.querySelector("article:last-child").addEventListener("click", showDialog);
}

/* ========== Dialog functions ========== */
function showDialog() {
    showDialogCharacter(this);
    document.querySelector("#character-dialog").showModal();
}
async function showDialogCharacter(article) {
    const selectedCharacterName = article.querySelector("h2").textContent;
    const character = await findCharacter(selectedCharacterName);
    const dialog = document.querySelector("#character-dialog");
    /* ===== image ===== */
    dialog.querySelector("figure").innerHTML = /*html*/`
    <img src="${character.image}">`;

    /* ===== name =====*/
    dialog.querySelector("#dialog-name").textContent = character.name;
    
    /* ===== Character Information ===== */
    dialog.querySelector("#dialog-occupation").textContent = character.occupation;
    dialog.querySelector("#dialog-age").textContent = character.age;
    dialog.querySelector("#dialog-gender").textContent = character.gender;
    dialog.querySelector("#dialog-haircolor").textContent = character.hairColor;
    dialog.querySelector("#dialog-religion").textContent = character.religion;
    dialog.querySelector("#dialog-grade").textContent = character.schoolgrade;
    dialog.querySelector("#dialog-voicedby").textContent = character.voicedBy;
    dialog.querySelector("#dialog-episodes").textContent = character.episodes;
    dialog.querySelector("#dialog-firstappearance").textContent = character.firstAppearance;
    dialog.querySelector("#dialog-appearances").textContent = character.appearances;
}
async function findCharacter(name) {
    const characters = await fetchData();
    for (const obj of characters) {
        if (obj.name === name) return obj;
    }
}