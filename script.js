window.addEventListener("load", fetchLastRace)

function fetchLastRace() {
    fetch("http://ergast.com/api/f1/current/last.json")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log("Error Reading data " + error));
}