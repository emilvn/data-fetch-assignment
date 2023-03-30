"use strict";
window.addEventListener("load", main);

/* =========== Global consts and main func =========== */
const characterContainer = document.querySelector("#characters");
const dialogContainer = document.querySelector("#dialog-grid");
async function main() {
    /* ===== Database URL ===== */
    const dataURL = "https://cederdorff.github.io/dat-js/05-data/southpark.json";
    const characters = await fetchCharacterData(dataURL);
    /* ===== sorting by amount of appearances =====*/
    characters.sort((charA, charB) => charB.appearances - charA.appearances);
    showAllCharacters(characters);
}
/* =========== Fetch character data =========== */
async function fetchCharacterData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response not ok")
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        throw err;
    }
}
/* ========== Object validation ========== */
function validateObject(obj) {
    const correctKeys = ["name", "nickname", "image", "occupation", "age", "voicedby", "gender", "religion", "catchphrase", "haircolor", "schoolgrade", "episodes", "appearances", "firstappearance"];
    validateImage(obj);
    for (const key in obj) {
        if (!correctKeys.includes(key.toLowerCase())){
            return false;
        }
    }
    return true;
}
function validateImage(obj) {
    /* ===== regex to match urls with valid file extensions ===== */
    const regEx = /^(.+?\.(png|jpe?g|gif)).*$/i;
    if (obj.image.indexOf(".png") === obj.image.lastIndexOf(".png") &&
        obj.image.indexOf(".jpg") === obj.image.lastIndexOf(".jpg") &&
        obj.image.indexOf(".jpeg") === obj.image.lastIndexOf(".jpeg") &&
        obj.image.indexOf(".gif") === obj.image.lastIndexOf(".gif"))
    {
        /* === replaces with the captured part $1: "(.+?\.(png|jpe?g|gif))" === */
        obj.image = obj.image.replace(regEx, '$1');
    }
    /* ===== if url doesnt start with http/https ===== */
    if (!/^https?/.test(obj.image)) {
        obj.image = "data/images/placeholder.png";
    }
}
function isUndefined(value) {
    const undefinedValues = ["unknown", "undefined", "n/a", "none", "", "nothing", "-", "no data", "null"];
    return undefinedValues.includes(String(value).toLowerCase());
}
/* =========== Display character data =========== */
function showAllCharacters(data) {
    for (const obj of data) {
        if(validateObject(obj)) showCharacter(obj);
    } 
}
function showCharacter(obj) {
    const myHTML = /*html*/ `
        <article>
        <img src=${obj.image}>
        <h2>${obj.name}</h2>
        <p>${!isUndefined(obj.occupation)? obj.occupation || "" : ""}</p>
        </article>
        `;
    characterContainer.insertAdjacentHTML("beforeend", myHTML);
    characterContainer.querySelector("article:last-child").addEventListener("click", () => showDialog(obj) );
}
/* ========== Dialog function ========== */
async function showDialog(character) {
    const dialog = document.querySelector("#character-dialog");

    /* ===== character information ===== */
    for (let key in character) {
        if (!character[key] || isUndefined(character[key])) {
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
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            resetInfoDisplayMode();
        }
    }); 
}
function resetInfoDisplayMode() {
    const characterInfoElements = document.querySelectorAll(".character-info");
    for (let i = 0; i < characterInfoElements.length; i++){
        characterInfoElements[i].style.display = "block";
    }
}