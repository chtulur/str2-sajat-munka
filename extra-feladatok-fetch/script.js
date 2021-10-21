//Fetched data in one array
const data = [
  fetch(
    "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json"
  ),
  fetch(
    "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json"
  ),
];
//Promise all Init
Promise.all([data[0], data[1]])
  .then((data) => {
    data.forEach((file) => {
      stepIn(file.json());
    });
  })
  .catch((err) => {
    let name = err.name;
    let message = err.message;
    alert(`ERROR: ${name} ${message}`);
  });

//Move one step in, in the objects
let oneStepIn;
const stepIn = (fetchPromises) => {
  fetchPromises.then((extractedData) => {
    for (let i in extractedData["sheets"]) {
      oneStepIn = i;
      teamAndPlayersListed(extractedData);
    }
  });
};

//List out everything
const teamAndPlayersListed = (extractedData) => {
  if (oneStepIn === "Teams") {
    hungaryListed(extractedData);
  } else {
    playersListed(extractedData);
  }
};

//team process for list. Creating an array for the printing to DOM.
const hungaryListed = (extractedData) => {
  let teamInfo;
  const infoArray = [0, 1, 2, 4, 6, 7];
  const hungaryEntries = Object.entries(extractedData["sheets"][oneStepIn][21]);
  for (let i = 0; i < infoArray.length; i++) {
    teamInfo = [hungaryEntries[infoArray[i]]];
    printOutTeam(teamInfo);
  }
};

//Players process for list. Creating an array for the printing to DOM.
const playersListed = (extractedData) => {
  const guys = [];
  const players = extractedData["sheets"][oneStepIn];
  players.forEach((player) => {
    guys.push(
      player.name + ", " + player.position + ", " + player.club + " " + "<br />"
    );
  });
  printOutPlayers(guys);
};

//team to DOM
const printOutTeam = (teamInfo) => {
  document.querySelector("#team").innerHTML +=
    teamInfo[0][0] + ": " + teamInfo[0][1] + "<br />";
};
//players to DOM
const printOutPlayers = (guys) => {
  guys.forEach((g) => (document.querySelector("#player").innerHTML += g));
};
