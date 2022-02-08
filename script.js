let previousRace = document.getElementById("previous");

window.addEventListener("load", fetchLastRace);

function fetchLastRace() {
    fetch("http://ergast.com/api/f1/current/last.json")
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
            let previousTitle = "<h2>Last Race</h2>";
            let raceName = data["MRData"]["RaceTable"]["Races"][0]["raceName"];
            let raceCircuit = data["MRData"]["RaceTable"]["Races"][0]["Circuit"]["circuitName"];
            let raceDate = data["MRData"]["RaceTable"]["Races"][0]["date"];
            let raceStart = data["MRData"]["RaceTable"]["Races"][0]["time"];
            previousTitle += `
                <p>${raceName}</p>
                <p>${raceCircuit}</p>
                <p>${raceDate}</p>
                <p>${raceStart}</p>
            `;
            previousRace.innerHTML = previousTitle;
            console.log(data["MRData"]["RaceTable"]["Races"][0])
        })
        .catch((error) => console.log(error));
}

// Refine with promise all !!!