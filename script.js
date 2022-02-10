let previousRace = document.getElementById("previous");
let nextRace = document.getElementById("next");
let allRaces = document.getElementById("full");

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
            let divContent = "<h2>Last Race</h2>";
            let raceDataObj = data["MRData"]["RaceTable"]["Races"][0];
            let raceName = raceDataObj["raceName"];
            let raceCircuit = raceDataObj["Circuit"]["circuitName"];
            let raceDate = raceDataObj["date"];
            let raceStart = raceDataObj["time"];
            divContent += `
                <p>${raceName}</p>
                <p>${raceCircuit}</p>
                <p>${new Date(`${raceDate} ${raceStart}`)}</p>
            `;
            previousRace.innerHTML = divContent;
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
            let divContent = "<h2>Next Race</h2>";
            let raceDataObj = data["MRData"]["RaceTable"]["Races"][0];
            let raceName = raceDataObj["raceName"];
            let raceCircuit = raceDataObj["Circuit"]["circuitName"];
            let raceDate = raceDataObj["date"];
            let raceStart = raceDataObj["time"];
            divContent += `
                <p>${raceName}</p>
                <p>${raceCircuit}</p>
                <p>${new Date(`${raceDate} ${raceStart}`)}</p>
            `;
            nextRace.innerHTML = divContent;
            console.log(raceDataObj)

            //countdown here!!
        })
        .catch((error) => console.log(error));
}

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
             divContent += `
                <div class="races" id="race${i}">
                    <p>${racesDataArr[i].raceName}</p>
                    <p>${racesDataArr[i].Circuit.circuitName}</p>
                    <p>${new Date(`${racesDataArr[i].date} ${racesDataArr[i].time}`)}</p>
                </div>
            `; 
        }
        allRaces.innerHTML = divContent;
        console.log(racesDataArr);
    })
    .catch((error) => console.log(error));
}


function loadEvents() {
    fetchLastRace();
    fetchNextRace();
    fetchAllRaces();
}

let form = document.getElementById("form");

form.addEventListener("submit", searchRace);

function searchRace(event) {
    event.preventDefault();

    let findRace = document.getElementById("search").value;

    const searchData = {
        raceName: findRace
    }


}

// Refine with promise all !!!