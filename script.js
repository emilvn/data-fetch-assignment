"use strict";
window.addEventListener("load", main);

/* ========== Database url ========== */
const DATA_URL = "https://cederdorff.github.io/dat-js/05-data/southpark.json";

/* ========== Array of different kinds of undefined values ========== */
const undefinedArray = ["unknown", "undefined", "n/a", "none", "", "nothing", "-", "no data", "null"];

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
            <p>${!undefinedArray.includes(String(obj.occupation).toLowerCase())? obj.occupation || "" : ""}</p>
        </article>
    `;
    characterContainer.insertAdjacentHTML("beforeend", myHTML);
    characterContainer.querySelector("article:last-child").addEventListener("click", () => showDialog(obj));
}

/* ========== Dialog function ========== */
async function showDialog(character) {
    const dialog = document.querySelector("#character-dialog");

    /* ===== character information ===== */
    for (let key in character) {
        if (!character[key] || undefinedArray.includes(String(character[key]).toLowerCase())) {
            dialog.querySelector(`#dialog-${key.toLowerCase()}`).parentNode.style.display = "none";
        }
        switch (key.toLowerCase()) {
            case "image":
                dialog.querySelector("figure").innerHTML = /*html*/`<img id="dialog-image" src="${character[key]}">`;
                break;
            case "catchphrase":
                dialog.querySelector("#dialog-catchphrase").textContent = `"${character[key]}"`;
                break;
        
            case "voicedby":
                dialog.querySelector("#dialog-voicedby").textContent = `${character.name} is voiced by ${character[key]}`;
                break;
            default:
                dialog.querySelector(`#dialog-${key.toLowerCase()}`).textContent = character[key];
                break;
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