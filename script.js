"use strict";
window.addEventListener("load", main);

/* ========== temporary object ========== */
const chef = {
    "name": "Jerome \"Chef\" McElroy",
    "nickname":"Chef",
    "image": "https://static.wikia.nocookie.net/southpark/images/3/38/JeromeChef.png",
    "occupation": "Cafeteria Chef",
    "age": 30,
    "voicedBy": "Isaac Hayes",
    "gender": "Male",
    "religion": "Christian",
    "catchPhrase": "Hello there, children.",
    "hairColor": "Black",
    "schoolgrade": null,
    "episodes": "S01E01 to S10E1",
    "appearances": 136,
    "firstApperance": "S01E01"
};

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
            <p>${obj.occupation}</p>
        </article>
    `;
    characterContainer.insertAdjacentHTML("beforeend", myHTML);
    characterContainer.querySelector("article:last-child").addEventListener("click", () => { showDialog(obj) });
}

/* ========== Dialog functions ========== */
async function showDialog(character) {
    const dialog = document.querySelector("#character-dialog");
    /* ===== image ===== */
    dialog.querySelector("figure").innerHTML = /*html*/`
    <img src="${character.image}">`;

    /* ===== name =====*/
    dialog.querySelector("#dialog-name").textContent = character.name;

    /* ===== quote ===== */
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