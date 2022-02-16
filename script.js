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
            let divContent = "<h3>Last Race</h3>";
            let raceDataObj = data["MRData"]["RaceTable"]["Races"][0];
            let raceName = raceDataObj["raceName"];
            let raceCircuit = raceDataObj["Circuit"]["circuitName"];
            let raceDate = raceDataObj["date"];
            let raceStart = raceDataObj["time"];
            divContent += `
                <h3 class="header-tag">${raceName}</h3>
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
            let divContent = "<h3>Next Race</h3>";
            let raceDataObj = data["MRData"]["RaceTable"]["Races"][0];
            let raceName = raceDataObj["raceName"];
            let raceCircuit = raceDataObj["Circuit"]["circuitName"];
            let raceDate = raceDataObj["date"];
            let raceStart = raceDataObj["time"];
            divContent += `
                <h3 class="header-tag">${raceName}</h3>
                <p>${raceCircuit}</p>
                <p>${new Date(`${raceDate} ${raceStart}`)}</p>
            `;
            nextRace.innerHTML = divContent;
            console.log(raceDataObj)

            //countdown here!!
        })
        .catch((error) => console.log(error));
}

let racesArr = [];

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
            raceObject.date = racesDataArr[i].date;
            raceObject.time = racesDataArr[i].time;
            racesArr.push(raceObject);
             divContent += `
                <div class="races" id="race${i}">
                    <p class="raceName">${racesDataArr[i].raceName}</p>
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
