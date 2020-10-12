/* Global Variables */

// variables for getting data
let zip = document.querySelector("#zip");
let feeling = document.querySelector("#feelings");
const generateButton = document.querySelector("#generate");

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

// Get weather data from Open Weather API
async function getWeatherData(zipCode) {
  return await fetch(
    `${baseURL}?zip=${zipCode},us&appid=${APIKey}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => response.main.temp);
}

// Update UI elements
function updateUI(response) {
  content.textContent = response.feeling;
  temp.textContent = response.temp;
  date.textContent = response.date;
}

// This function will get "projectData" from server
async function getData(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then(async (response) => {
      return await response;
    });
}

// Add this data to project data
async function postData(url, data) {
  await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    return await response;
  });
}

// Update zip code and feeling on every change
zip.addEventListener("input", (e) => {
  zip = e.target.value;
});

feeling.addEventListener("change", (e) => {
  feeling = e.target.value;
});

// The click listener for all functions
generateButton.addEventListener("click", async () => {
  getWeatherData(zip)
    .then(async (response) => {
      await postData("http://localhost:3000/add", {
        feeling: feeling,
        temp: response,
        date: newDate,
      });
      console.log("here");
    })
    .then(async () => {
      return await getData("http://localhost:3000/weather");
    })
    .then(async (response) => updateUI(response));
});
