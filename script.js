"use strict";
window.addEventListener("load", main);

const characterContainer = document.querySelector("#characters");
const dialogContainer = document.querySelector("#dialog-grid");
/* =========== Main =========== */
async function main() {
    const characters = await fetchData();
    showCharacters(characters);
}
/* =========== Fetch data =========== */
async function fetchData() {
    const response = await fetch("data/tpb.json");
    const data = await response.json();
    return data;
}
/* =========== Display data =========== */
function showCharacters(data) {
    for (const obj of data) {
        const myHTML = /*html*/`
        <article>
            <img src=${obj["image"]}>
            <h2>${obj["name"]}</h2>
            <p>${capitalize(obj["role"])}</p>
        </article>
    `
        characterContainer.insertAdjacentHTML("beforeend", myHTML);
        characterContainer.querySelector("article:last-child").addEventListener("click", showDialog);
    } 
}
/* =========== Fortmat date correctly for Date object =========== */
function formatDate(date) {
    let dateArr = date.split("-");
    dateArr = dateArr.reverse();
    return dateArr.join("-");
}
/* =========== Calculate age from date of birth =========== */
function getCurrentAge(birthdate) {
    const today = new Date(Date.now());
    const dateOfBirth = new Date(formatDate(birthdate));
    if (today.getMonth() < dateOfBirth.getMonth() || (today.getMonth() === dateOfBirth.getMonth() && today.getDate() < dateOfBirth.getDate())) {   
        return today.getFullYear() - dateOfBirth.getFullYear() - 1;
    }
    else {
        return today.getFullYear() - dateOfBirth.getFullYear();
    }
}
/* =========== Text edit functions =========== */
function capitalize(name) {
    return name[0].toUpperCase() + name.substring(1).toLowerCase();
}

function showDialog() {
    showDialogCharacter(this);
    document.querySelector("#character-dialog").showModal();
}

async function showDialogCharacter(article) {
    const selectedCharacterName = article.querySelector("h2").textContent;
    const characterObj = await findCharacter(selectedCharacterName);
    const myHTML = /*html*/`
            <figure>
                <img src=${characterObj["image"]}>
            </figure>
            <article>
                <h2>${characterObj["name"]}</h2>
                <p id="dialog-quote">"${characterObj["quote"]}"</p>
                <h3>Personal info</h3>
                <p>Birthdate: ${characterObj["birthdate"]}</p>
                <p>Age: ${getCurrentAge(characterObj["birthdate"])}</p>
                <p>Gender: ${capitalize(characterObj["gender"])}</p>
                <p>Favorite food/drink: ${capitalize(characterObj["favorite"])}</p>
                <p>Role: ${capitalize(characterObj["role"])}</p>
                <p>Favorite passtime: ${capitalize(characterObj["passtime"])}</p>
                <p>Sport of choice: ${capitalize(characterObj["sport"])}</p>
            </article>
    `;
    dialogContainer.innerHTML = myHTML;
}

async function findCharacter(name) {
    const characters = await fetchData();
    for (const obj of characters) {
        if (obj["name"] === name) return obj;
    }
}