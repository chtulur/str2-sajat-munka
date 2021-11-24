const data = [
  `https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json`,
  `https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json`,
];

const getData = async () => {
  try {
    let arr = await Promise.all(
      data.map((url) => fetch(url).then((response) => response.json()))
    );
    printTeam(arr[0]["sheets"]["Teams"][21]);
    printPlayers(arr[1]["sheets"]["Players"]);
  } catch (err) {
    console.error(err.message);
  }
};
getData();

const printTeam = (arr1) => {
  document.querySelector(`#team`).innerHTML = Object.entries(arr1)
    .map((info) => `${info[0]}: ${info[1]}<br />`)
    .join("");
};

const printPlayers = (arr2) => {
  document.querySelector(`#player`).innerHTML = arr2
    .map((player) => `${player.name}, ${player.position}, ${player.club}<br />`)
    .join("");
};
