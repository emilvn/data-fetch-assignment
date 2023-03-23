"use strict";
window.addEventListener("load", main);

/* ========== Database url ========== */
const DATA_URL = "data/southpark.json";

/* =========== Global consts and main func =========== */
const characterContainer = document.querySelector("#characters");
const dialogContainer = document.querySelector("#dialog-grid");
async function main() {
    const characters = await fetchData(DATA_URL);
    showAllCharacters(characters);
}

/* =========== Fetch character data =========== */
async function fetchData(url) {
    try {
        const response = await fetch(url);
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
            <p>${obj.occupation}</p>
        </article>
    `;
    characterContainer.insertAdjacentHTML("beforeend", myHTML);
    characterContainer.querySelector("article:last-child").addEventListener("click", () => showDialog(obj));
}

/* ========== Dialog function ========== */
async function showDialog(character) {
    const dialog = document.querySelector("#character-dialog");
    /* ===== image ===== */
    dialog.querySelector("figure").innerHTML = /*html*/`
    <img src="${character.image}">`;

    /* ===== name and catchphrase =====*/
    dialog.querySelector("#dialog-name").textContent = character.name;
    dialog.querySelector("#dialog-quote").textContent = `"${character.catchPhrase}"`;
    
    /* ===== Character Information ===== */
    dialog.querySelector("#dialog-nickname").textContent = character.nickname;
    dialog.querySelector("#dialog-occupation").textContent = character.occupation;
    dialog.querySelector("#dialog-age").textContent = character.age;
    dialog.querySelector("#dialog-gender").textContent = character.gender;
    dialog.querySelector("#dialog-haircolor").textContent = character.hairColor;
    dialog.querySelector("#dialog-religion").textContent = character.religion;
    dialog.querySelector("#dialog-grade").textContent = character.schoolGrade;
    dialog.querySelector("#dialog-voicedby").textContent = `${character.name} is voiced by ${character.voicedBy}`;
    dialog.querySelector("#dialog-episodes").textContent = character.episodes;
    dialog.querySelector("#dialog-firstappearance").textContent = character.firstAppearance;
    dialog.querySelector("#dialog-appearances").textContent = character.appearances;
    
    /* ===== Show dialog ===== */
    document.querySelector("#character-dialog").showModal();
}