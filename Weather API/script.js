const apiKey = "8edfa28414bf9a1d2718ab2975ff203e"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const historyList = document.getElementById("historyList");

// Event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

// Async function using fetch
async function getWeather(city) {

    console.log("1 Function started");
    
    try {

        console.log("2️ Before fetch call");

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        console.log("3 After fetch response");

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        console.log("4️ Weather data received", data);

        displayWeather(data);
        saveToLocalStorage(city);

    } catch (error) {

        console.log(" Error occurred:", error);

        weatherResult.innerHTML =
            `<p style="color:red;">Error: ${error.message}</p>`;
    }

    console.log(" 5 Function finished");
}

function displayWeather(data) {

    const city = data.name;
    const temp = data.main.temp;
    const condition = data.weather[0].description;

    weatherResult.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Condition: ${condition}</p>
    `;
}

// Save city to Local Storage
function saveToLocalStorage(city) {

    let history = JSON.parse(localStorage.getItem("cities")) || [];

    if (!history.includes(city)) {
        history.push(city);
    }

    localStorage.setItem("cities", JSON.stringify(history));

    loadHistory();
}

// Load history
function loadHistory() {

    historyList.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("cities")) || [];

    history.forEach(city => {

        const li = document.createElement("li");
        li.textContent = city;

        li.addEventListener("click", () => {
            getWeather(city);
        });

        historyList.appendChild(li);
    });
}

// Load history when page opens
loadHistory();