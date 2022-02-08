window.addEventListener("load", fetchLastRace)

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
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
}