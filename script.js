// Variables
const form = document.getElementById("cityInputForm");
const apiKey = "41c04719b360f122d7f0ad523a0376b5";
let farenheight = true;

// Local Storage: To be able to delete city boxes
const localStorage = [];

form.addEventListener("submit", (e) => {
  // Stop automatic reload
  e.preventDefault();

  // Value of input
  let inpVal = document.getElementById("searchInp").value;

  // API Call
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inpVal}&appid=${apiKey}`;

  // Calling API with XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = function (argument, rejected) {
    if (this.status == 200) {
      // If call goes good:
      let data = JSON.parse(this.responseText);
      console.log(data);

      // Temperature comes in Kelvin
      // Kelvin to Farenheight: (K − 273.15) × 9/5 + 32
      // Kelvin to Celcius: K − 273.15

      // Create DOM element
      let card = document.createElement("div");

      let temp =
        farenheight == true
          ? ((data.main.temp - 273.15) * 9) / 5 + 32
          : data.main.temp - 273.15;

      console.log(data.weather[0].icon);

      // Set new DOM element's HTML to box card
      card.innerHTML = `<div class="box">
      <div id="topOfBox">
        <h4>${data.name}, ${data.sys.country}</h4>
        <button id="btn${
          data.name
        }" class="deleteBtn btn btn-secondary btn-xs"> x </button>
      </div>
      <div class="twoColumns">
        <h2>${Math.floor(temp)}<sup>℉</sup></h2>
        <div>
          <img class="weatherIcon" src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="" />
        </div>
      </div>
      <p>${data.weather[0].main}</p>
    </div>`;

      localStorage.push(data.name);

      // Adding event listener
      document
        .getElementById(`btn${data.name}`)
        .addEventListener("click", () => {
          console.log("It works");
        });

      // Appending new element to DOM
      document.getElementById("gridList").appendChild(card);

      //
    } else {
      document.getElementById("alertUser").style.opacity = "100%";

      setTimeout(() => {
        document.getElementById("alertUser").style.opacity = "0%";
      }, 3000);
    }
  };
  xhr.send();
});

// Eliminate a weather card with button
