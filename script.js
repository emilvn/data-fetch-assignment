"use strict";
window.addEventListener("load", main);

const characterContainer = document.querySelector("#characters");

async function main() {
    const characters = await loadJSON();
    showCharacters(characters);
}

async function loadJSON() {
    const response = await fetch("data/tpb.json");
    const data = await response.json();
    return data;
}

function showCharacters(data) {
    for (const obj of data) {
        const myHTML = /*html*/`
        <article>
            <img src=${obj["image"]}>
            <h2>${obj["name"]}</h2>
            <p>Age: ${getCurrentAge(obj["birthdate"])}</p>
            <p>Gender: ${capitalize(obj["gender"])}</p>
            <p>Favorite food/drink: ${capitalize(obj["favorite"])}</p>
            <p>Role: ${capitalize(obj["role"])}</p>
        </article>
    `
    characterContainer.insertAdjacentHTML("beforeend", myHTML);
    } 
}

function formatDate(date) {
    let dateArr = date.split("-");
    dateArr = dateArr.reverse();
    return dateArr.join("-");
}

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

function capitalize(name) {
    return name[0].toUpperCase() + name.substring(1).toLowerCase();
}