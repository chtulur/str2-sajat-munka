const data = [
  fetch(
    "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json"
  ),
  fetch(
    "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json"
  ),
];
Promise.all([data[0], data[1]])
  .then((data) => {
    data.forEach((file) => {
      stepIn(file.json());
    });
  })
  .catch((err) => {
    console.log("ERROR: ", err.message);
  });
const stepIn = (fetchPromises) => {
  fetchPromises.then((extractedData) => {
    if (Object.keys(extractedData["sheets"])[0] === "Teams") {
      hungaryListed(extractedData);
    } else {
      playersListed(extractedData);
    }
  });
};
const hungaryListed = (extractedData) => {
  [0, 1, 2, 4, 6, 7].forEach((info) => {
    let teamInfo = [Object.entries(extractedData["sheets"]["Teams"][21])[info]];
    printOutTeam(teamInfo);
  });
};
const playersListed = (extractedData) => {
  const guys = [];
  extractedData["sheets"]["Players"].forEach((player) => {
    guys.push(
      player.name + ", " + player.position + ", " + player.club + " " + "<br />"
    );
  });
  printOutPlayers(guys);
};
const printOutTeam = (teamInfo) => {
  document.querySelector("#team").innerHTML +=
    teamInfo[0][0] + ": " + teamInfo[0][1] + "<br />";
};
const printOutPlayers = (guys) => {
  guys.forEach((g) => (document.querySelector("#player").innerHTML += g));
};
