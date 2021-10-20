window.addEventListener("load", startFetch);
let teams = fetch(
  "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json"
);
let teamMembers = fetch(
  "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json"
);

function startFetch() {
  Promise.all([teams, teamMembers])
    .then((data) => {
      data.forEach((file) => {
        process(file.json());
      });
    })
    .catch((err) => {
      let name = err.name;
      let message = err.message;
      alert(`ERROR: ${name} ${message}`);
    });
}

let oneStepIn;

let process = (fetchPromises) => {
  fetchPromises
    .then((extractedData) => {
      for (let i in extractedData["sheets"]) {
        oneStepIn = i;
      }
      if (oneStepIn === "Teams") {
        let keys = [];
        let values = [];
        let hungaryKeys = Object.keys(extractedData["sheets"][oneStepIn][21]);
        let infoArray = [0, 1, 2, 4, 6, 7];

        infoArray.forEach((num) => {
          keys.push(JSON.stringify(hungaryKeys[num]).replace(/\"/g, "") + ": ");
        });
        let hungaryValues = Object.values(
          extractedData["sheets"][oneStepIn][21]
        );
        infoArray.forEach((num) => {
          values.push(JSON.stringify(hungaryValues[num]).replace(/\"/g, ""));
        });
        for (let i = 0; i < keys.length; i++) {
          document.querySelector("#team").innerHTML +=
            keys[i] + values[i] + "<br />";
        }
      } else {
        let guys = [];
        let players = extractedData["sheets"][oneStepIn];
        players.forEach((player) => {
          guys.push(
            player.name +
              ", " +
              player.position +
              ", " +
              player.club +
              ", " +
              "<br />"
          );
        });
        guys.forEach((g) => (document.querySelector("#player").innerHTML += g));
      }
    })
    .catch((error) => {
      error = "Oops, something went wrong!";
      alert(`ERROR: ${error}`);
    });
};
