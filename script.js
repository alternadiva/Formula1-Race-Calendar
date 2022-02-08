let previousRace = document.getElementById("previous");
let nextRace = document.getElementById("next");

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
            let raceName = data["MRData"]["RaceTable"]["Races"][0]["raceName"];
            let raceCircuit = data["MRData"]["RaceTable"]["Races"][0]["Circuit"]["circuitName"];
            let raceDate = data["MRData"]["RaceTable"]["Races"][0]["date"];
            let raceStart = data["MRData"]["RaceTable"]["Races"][0]["time"];
            divContent += `
                <p>${raceName}</p>
                <p>${raceCircuit}</p>
                <p>${raceDate}</p>
                <p>${raceStart}</p>
            `;
            previousRace.innerHTML = divContent;
            console.log(data["MRData"]["RaceTable"]["Races"][0])
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
            let raceName = data["MRData"]["RaceTable"]["Races"][0]["raceName"];
            let raceCircuit = data["MRData"]["RaceTable"]["Races"][0]["Circuit"]["circuitName"];
            let raceDate = data["MRData"]["RaceTable"]["Races"][0]["date"];
            let raceStart = data["MRData"]["RaceTable"]["Races"][0]["time"];
            divContent += `
                <p>${raceName}</p>
                <p>${raceCircuit}</p>
                <p>${raceDate}</p>
                <p>${raceStart}</p>
            `;
            nextRace.innerHTML = divContent;
            console.log(data["MRData"]["RaceTable"]["Races"][0])

            //countdown here!!
        })
        .catch((error) => console.log(error));
}

function loadEvents() {
    fetchLastRace();
    fetchNextRace();
}

// Refine with promise all !!!