/* Global Variables */

// variables for getting data
const generateButton = document.querySelector("#generate");
const zipNumber = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");

// variables for updating UI
const data = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

// API variables
const baseURL = "http://api.openweathermap.org/data/2.5/weather";
const APIKey = "7ae83410f1ab7bc58c6a3ea0332c4938";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

async function getWeatherData(zipCode) {
  return await fetch(`${baseURL}?zip=${zipCode},us&appid=${APIKey}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => response.main.temp);
}

function updateUI(response) {
  content.textContent = response.feeling;
  temp.textContent = response.temp;
  date.textContent = response.date;
}

async function getData(url) {
  await fetch(url)
    .then((response) => response.json())
    .then(async (response) => await updateUI(response));
}

async function postData(url, data) {
  await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    console.log("response", response);
    return await response;
  });
}

generateButton.addEventListener("click", async () => {
  getWeatherData(zip.value)
    .then(async (response) => {
      await postData("http://localhost:3000/add", {
        feeling: feelings.value,
        temp: response,
        date: newDate,
      });
    })
    .then(async () => {
      await getData("http://localhost:3000/weather");
    });
});
