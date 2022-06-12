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

  // Creating an XHR object
  let xhr = new XMLHttpRequest();

  // Calling API with XMLHttpRequest object
  xhr.open("GET", url, true);

  xhr.onload = function (argument, rejected) {
    if (this.status == 200) {
      // If call goes good:
      let data = JSON.parse(this.responseText);

      if (localStorage.includes(data.name)) {
        document.getElementById("alertUser").innerHTML =
          "City already added below!";

        document.getElementById("alertUser").style.opacity = "100%";

        setTimeout(() => {
          document.getElementById("alertUser").style.opacity = "0%";
        }, 3000);

        throw new Error("City already added below");
      }

      // Temperature comes in Kelvin
      // Kelvin to Farenheight: (K − 273.15) × 9/5 + 32
      // Kelvin to Celcius: K − 273.15

      // Create DOM element
      let card = document.createElement("div");

      let temp =
        farenheight == true
          ? ((data.main.temp - 273.15) * 9) / 5 + 32
          : data.main.temp - 273.15;

      // Set new DOM element's HTML to box card
      card.innerHTML = `<div class="box">
      <div id="topOfBox">
        <h4>${data.name}, ${data.sys.country}</h4>
      </div>
      <div class="twoColumns">
        <h2>${Math.floor(temp)}<sup>${farenheight ? "℉" : "℃"}</sup></h2>
        <div>
          <img class="weatherIcon" src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="" />
        </div>
      </div>
      <p>${data.weather[0].main}</p>
    </div>`;

      // Adding name of city to local storage
      localStorage.push(data.name);

      // Appending new element to DOM
      document.getElementById("gridList").appendChild(card);

      // If API call fails
    } else {
      document.getElementById("alertUser").innerHTML =
        "Please enter a valid city!";

      document.getElementById("alertUser").style.opacity = "100%";

      setTimeout(() => {
        document.getElementById("alertUser").style.opacity = "0%";
      }, 3000);
    }

    document.getElementById("searchInp").value = "";
  };

  xhr.send();
});

// Open info box button
document.getElementById("moreInfo").addEventListener("click", () => {
  document.getElementById("infoBox").style.display = "block";
  document.getElementById("backgroundBlur").style.display = "block";
});

// Close info box button
document.getElementById("infoBoxBtn").addEventListener("click", () => {
  document.getElementById("infoBox").style.display = "none";
  document.getElementById("backgroundBlur").style.display = "none";
});

// Change between celcius and farenheight
function changeDegrees() {
  farenheight = farenheight ? false : true;

  if (farenheight) {
    document.getElementById("farenheight").innerHTML = "F";
  } else {
    document.getElementById("farenheight").innerHTML = "C";
  }
}
