let previousRace = document.getElementById("previous");
let nextRace = document.getElementById("next");
let allRaces = document.getElementById("full");
import {circuitInfo} from "./circuits.js";

window.addEventListener("load", loadEvents);

function fetchLastRace() {
    fetch("https://ergast.com/api/f1/current/last.json")
        .then((response) => {
            if (!response.ok) {
                const error = new Error(response.status);
                throw error;
            }
            else {
                return response.json();
            }
        })
        .then((data) => {
            let divContent = "<h3>Last Race</h3>";
            let raceDataObj = data["MRData"]["RaceTable"]["Races"][0];
            let raceName = raceDataObj["raceName"];
            let raceCircuit = raceDataObj["Circuit"]["circuitName"];
            let raceLocality = raceDataObj["Circuit"]["Location"]["locality"];
            let raceDate = raceDataObj["date"];
            let raceStart = raceDataObj["time"];
            let dateTimeObject = new Date(`${raceDate} ${raceStart}`);
            let circuitImg;
            for (let i = 0; i < circuitInfo.length; i++) {
                if (circuitInfo[i].circuitName === raceCircuit) {
                    circuitImg = circuitInfo[i].circuitImg;
                }
            }
            divContent += `
                <h3 class="header-tag">${raceName}</h3>
                <div class="race-flex">
                    <div class="img-container">
                        <a href="${circuitImg}"><img src="${circuitImg}" alt="${raceCircuit}" class="circuit-img"></a>
                    </div> 
                    <div class="line"></div>
                    <div class="race-info" id="prev-info">
                        <p>${raceCircuit}, ${raceLocality}</p>
                        <p>${dateTimeObject}</p>
                    </div>
                </div>  
            `;
            previousRace.innerHTML = divContent;
            let prevRaceInfo = document.getElementById("prev-info");
            countDown(dateTimeObject, prevRaceInfo);
            console.log(raceDataObj);
        })
        .catch((error) => console.log(error));
}


function fetchNextRace() {
    fetch("https://ergast.com/api/f1/current/next.json")
        .then((response) => {
            if (!response.ok) {
                const error = new Error(response.status);
                throw error;
            }
            else {
                return response.json();
            }
        })
        .then((data) => {
            let divContent = "<h3>Next Race</h3>";
            let raceDataObj = data["MRData"]["RaceTable"]["Races"][0];
            let raceName = raceDataObj["raceName"];
            let raceCircuit = raceDataObj["Circuit"]["circuitName"];
            let raceLocality = raceDataObj["Circuit"]["Location"]["locality"];
            let raceDate = raceDataObj["date"];
            let raceStart = raceDataObj["time"];
            let dateTimeObject = new Date(`${raceDate} ${raceStart}`);
            let circuitImg;
            for (let i = 0; i < circuitInfo.length; i++) {
                if (circuitInfo[i].circuitName === raceCircuit) {
                    circuitImg = circuitInfo[i].circuitImg;
                }
            }
            divContent += `
                <h3 class="header-tag">${raceName}</h3>
                <div class="race-flex">
                    <div class="img-container">
                        <a href="${circuitImg}"><img src="${circuitImg}" alt="${raceCircuit}" class="circuit-img"></a>
                    </div>
                    <div class="line"></div> 
                    <div class="race-info" id="next-info">
                        <p>${raceCircuit}, ${raceLocality}</p>
                        <p>${dateTimeObject}</p>
                    </div>
                </div>
            `;
            nextRace.innerHTML = divContent;
            let nextRaceInfo = document.getElementById("next-info");
            countDown(dateTimeObject, nextRaceInfo);
            console.log(raceDataObj)

            //countdown here!!
        })
        .catch((error) => console.log(error));
}

let racesArr = [];

function countDown(date, renderDOM) {
    let raceStart = date.getTime();
    let countDownDiv = document.createElement("p");
    let intervalCount = setInterval(function() {
        
        let currentTime = new Date().getTime();
        let difference = raceStart - currentTime;

        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        let countDownDisplay = days + " days " + hours + ":" + minutes + ":" + seconds;
        countDownDiv.innerHTML = countDownDisplay;
        renderDOM.appendChild(countDownDiv);

        if (difference < 0) {
            clearInterval(intervalCount);
            countDownDiv.innerHTML = `<a href="">Results</a>`;
          }
    }, 1000); 
}

//countDown(new Date("Sun Mar 20 2022 16:00:00"));

function fetchAllRaces() {
    fetch("https://ergast.com/api/f1/2022.json")
    .then((response) => {
        if (!response.ok) {
            const error = new Error(response.status);
            throw error;
        }
        else {
            return response.json();
        }
    })
    .then((data) => {
        let divContent = "";
        let racesDataArr = Array.from(data["MRData"]["RaceTable"]["Races"]);
        for (let i = 0; i < racesDataArr.length; i++) {
            let raceObject = {}; 
            raceObject.raceName = racesDataArr[i].raceName;
            raceObject.circuitName = racesDataArr[i].Circuit.circuitName;
            raceObject.raceLocality = racesDataArr[i].Circuit.Location.locality;
            raceObject.date = racesDataArr[i].date;
            raceObject.time = racesDataArr[i].time;
            let dateTimeObject = new Date(`${racesDataArr[i].date} ${racesDataArr[i].time}`);
            racesArr.push(raceObject);
            let circuitImg;
            for (let j = 0; j < circuitInfo.length; j++) {
                if (circuitInfo[j].circuitName === raceObject.circuitName) {
                    circuitImg = circuitInfo[j].circuitImg;
                }
            }
            divContent += `
                <div class="races" id="race${i}">
                    <p class="raceName">${raceObject.raceName}</p>
                    <div class="race-flex">
                        <div class="img-container">
                            <img src="${circuitImg}" alt="${raceObject.circuitName}" class="circuit-img">
                        </div> 
                        <div class="line"></div>
                        <div class="race-info" id="current-info${i}">
                            <p>${raceObject.circuitName}, ${raceObject.raceLocality}</p>
                            <p>${dateTimeObject}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        allRaces.innerHTML = divContent;
        let racesDivs = allRaces.querySelectorAll(".races");
        console.log(racesDivs[0])
        console.log(racesDataArr);
    })
    .catch((error) => console.log(error));
}



console.log(racesArr);


function loadEvents() {
    fetchLastRace();
    fetchNextRace();
    fetchAllRaces();
}

let form = document.getElementById("form");
let output = document.getElementById("output");

form.addEventListener("submit", searchRace);

function searchRace(event) {
    event.preventDefault();
    let input = document.getElementById("search").value;
    let filteredRaces = search(input);

    output.innerHTML = "";
    filteredRaces.forEach(race => {
        let divContent = "";
        divContent += `
            <p>${race.raceName}</p>
            <p>${race.circuitName}</p>
            <p>${race.date}</p>
            <p>${race.time}</p>
            `;
        output.innerHTML = divContent;
    });

}

function search(value) {
    if (typeof value !== "string" || value.length === 0) {
        return racesArr;
    }

    let lowerCaseValue = value.toLowerCase();
    let filtered = racesArr.filter(race => {
        if (race.raceName.toLowerCase().includes(lowerCaseValue)) {
            return true;
        }
        if (race.circuitName.toLowerCase().includes(lowerCaseValue)) {
            return true;
        }

        return false;
    })
    return filtered;
}


// Refine with promise all !!!
