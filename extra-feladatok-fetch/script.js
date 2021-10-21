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

const stepIn = (fetchPromises) => {
  fetchPromises.then((extractedData) => {
    Object.keys(extractedData[`sheets`])[0] === `Teams`
      ? printOutTeam(extractedData)
      : printOutPlayers(extractedData);
  });
};

const printOutTeam = (extractedData) => {
  Object.entries(extractedData[`sheets`][`Teams`][21]).forEach(
    (aspect) =>
      (document.querySelector(`#team`).innerHTML +=
        aspect[0] + `: ` + aspect[1] + `<br />`)
  );
};

const printOutPlayers = (extractedData) => {
  extractedData[`sheets`][`Players`].forEach((player) => {
    document.querySelector(`#player`).innerHTML +=
      player.name +
      `, ` +
      player.position +
      `, ` +
      player.club +
      ` ` +
      `<br />`;
  });
};
