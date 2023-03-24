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

    /* ===== image, catchphrase and voiced by ===== */
    dialog.querySelector("figure").innerHTML = /*html*/`<img src="${character.image}">`;
    dialog.querySelector("#dialog-catchPhrase").textContent = `"${character.catchPhrase}"`;
    dialog.querySelector("#dialog-voicedBy").textContent = `${character.name} is voiced by ${character.voicedBy}`;

    /* ===== rest of character information ===== */
    for (let key in character) {
        if (!character[key]) {
            dialog.querySelector(`#dialog-${key}`).parentNode.style.display = "none";
        }
        if (key !== "image" && key !== "catchPhrase" && key !== "voicedBy") {
            dialog.querySelector(`#dialog-${key}`).textContent = character[key];
        }
    }
    
    /* ===== Show dialog ===== */
    document.querySelector("#character-dialog").showModal();

    /* ===== reset hidden elements on dialog close ===== */
    dialog.querySelector("#cancel-btn").addEventListener("click", resetInfoDisplayMode);
}

function resetInfoDisplayMode() {
    const characterInfoElements = document.querySelectorAll(".character-info");
    for (let i = 0; i < characterInfoElements.length; i++){
        characterInfoElements[i].style.display = "block";
    }
}