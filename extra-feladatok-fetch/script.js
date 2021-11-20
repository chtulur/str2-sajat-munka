const getData = async () => {
  const data = [
    `https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json`,
    `https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json`,
  ];
  try {
    let arr = await Promise.all(
      data.map((url) => fetch(url).then((response) => response.json()))
    );
    printTeam(arr);
    printPlayers(arr);
  } catch (err) {
    console.error(err.message);
  }
};
getData();

const printTeam = (arr) => {
  document.querySelector(`#team`).innerHTML = Object.entries(
    arr[0]["sheets"]["Teams"][21]
  )
    .map((info) => `${info[0]}: ${info[1]}<br />`)
    .join("");
};

const printPlayers = (arr) => {
  document.querySelector(`#player`).innerHTML = arr[1]["sheets"]["Players"]
    .map((player) => `${player.name}, ${player.position}, ${player.club}<br />`)
    .join("");
};
