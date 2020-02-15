import fetch from 'isomorphic-fetch';

const key = 'AIzaSyDHNixsXQ6HS6pImfxyGcDVTfnAOR5CO30';
const sheetId = '1n6KpxAspvzpVt-Oef6ZVA44qEPuHCDcUAMEqQ0WTSoI';
const ranges = [
  'TopStory!A:D',
  'Champions!A:C',
  'PlayoffAppearances!A:E',
  'Playoffs!A:C',
  'Matchup!A:F',
  'BowlGames!A:F',
];

const rangesParam = ranges.map(r => `ranges=${r}`).join('&');
const batchGetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${rangesParam}&key=${key}`;


export default {
  load: () => new Promise((resolve, reject) => {
    const options = {
      method: 'get',
      compress: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    console.log("LOADING SHEETS DATA", batchGetUrl, options);
    fetch(batchGetUrl, options)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log("SHEETS DATA:", data);
            const { valueRanges } = data;
            let appData = {};
            valueRanges.forEach(vr => {
              let r = vr.range.split('!')[0];
              // slice off headers
              appData[r] = vr.values.slice(1);
            });
            resolve(appData);
          })
          .catch(e => {
            console.error(e);
            reject(e);
          })
        }
      })
      .catch(e => {
        console.error(e);
        reject(e);
      });
  }),
};
