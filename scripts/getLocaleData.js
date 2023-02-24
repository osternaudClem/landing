const { extractSheets } = require('spreadsheet-to-json');
const fs = require('fs');

// const key = '1xQ4zy8J0UuLZu9-FtGX2MqHj0AbiTg0RBctNDj0sf7g';
const key = '1XiaHmJt5i1sXBeTZsk241yiVlztxksW0dK1VlVDs2B8';
const fileName = 'src/localeData.json';

extractSheets(
  {
    // your google spreadhsheet key
    spreadsheetKey: key,
    // your google oauth2 credentials or API_KEY
    credentials: 'AIzaSyBCaDZbm8bjsgy-zLtgejlcwAtNJnqgQWI',
    // optional: names of the sheets you want to extract
    // sheetsToExtract: ['Customers', 'Invoices'],
    // optional: custom function to parse the cells
    // formatCell: formatCell,
  },
  function (err, datas) {
    if (key === null) {
      return;
    }

    const localeJS = {};

    datas.Sheet1.map((data) => {
      if (data.key === null) {
        return null;
      }

      Object.keys(data).forEach((key) => {
        let langCode = null;
        let langKey = null;
        let langKeyVal = null;

        if (key !== 'key') {
          langCode = key;
          langKey = data.key;
          langKeyVal = data[key];
          if (localeJS[langCode] === undefined) {
            localeJS[langCode] = {
              translation: {},
            };
          }
          localeJS[langCode].translation[langKey] = langKeyVal;
        }
      });
      return data;
    });

    // console.log('>>> localeJS', localeJS);
    fs.writeFileSync(fileName, JSON.stringify(localeJS, null, '\t'), 'utf8');
  }
);
