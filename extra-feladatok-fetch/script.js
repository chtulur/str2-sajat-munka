const data = [
  `https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json`,
  `https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json`,
];

Promise.all(data.map((url) => fetch(url)))
  .then((data) => {
    data.forEach((file) => {
      stepIn(file.json());
    });
  })
  .catch((err) => {
    console.log(`ERROR: `, err.message);
  });

const stepIn = (data) => {
  data.then((data) => {
    Object.keys(data[`sheets`])[0] === `Teams`
      ? printOutTeam(data)
      : printOutPlayers(data);
  });
};

const printOutTeam = (data) => {
  document.querySelector(`#team`).innerHTML = Object.entries(
    data[`sheets`][`Teams`][21]
  )
    .map((aspect) => `${aspect[0]}: ${aspect[1]}<br />`)
    .join("");
};

const printOutPlayers = (data) => {
  document.querySelector(`#player`).innerHTML = data[`sheets`][`Players`]
    .map((player) => `${player.name}, ${player.position}, ${player.club}<br />`)
    .join("");
};
