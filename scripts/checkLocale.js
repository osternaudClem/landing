const fs = require('fs');
const colors = require('colors');
const dirTree = require('directory-tree');
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const REGEX = new RegExp(/__\([\"\']([\w\d\s.:,;]*)[\'\"]\)/, 'gi');

module.exports = (async function (options = {}) {
  let error = false;
  options = {
    exclude: [/node_modules/, /build/, /yarn.lock/, /public/],
    sheet_id: process.env.REACT_APP_SHEET_ID,
    google_email: process.env.REACT_APP_GOOGLE_EMAIL,
    google_key: process.env.REACT_APP_GOOGLE_KEY,
  };

  if (!options.sheet_id) {
    console.error('Error: `sheet_id` is missing !'.red);
    error = true;
  }

  if (!options.google_email) {
    console.error('Error: `google_email` is missing !'.red);
    error = true;
  }

  if (!options.google_key) {
    console.error('Error: `google_key` is missing !'.red);
    error = true;
  }

  if (error) {
    return;
  }

  const localesKeys = [];
  const sheetKeys = [];
  let missingKeys = [];

  const filteredTree = dirTree('./', {
    exclude: options.exclude ?? [],
    depth: 10,
  });

  readFolder(filteredTree.children);

  function readFolder(folder) {
    Object.keys(folder).map((key) => {
      if (folder[key].children) {
        return readFolder(folder[key].children);
      }
      const path = folder[key].path;

      const data = fs.readFileSync(path, {
        encoding: 'utf8',
        flag: 'r',
      });

      const array = [...data.matchAll(REGEX)];
      return array.map((a) => localesKeys.push(a[1]));
    });
  }

  const doc = new GoogleSpreadsheet(options.sheet_id);

  try {
    await doc.useServiceAccountAuth({
      client_email: options.google_email,
      private_key: options.google_key,
    });
  } catch (error) {
    return console.log('>>> error', error);
  }

  await loadSheet();

  async function loadSheet() {
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    rows.map((row) => {
      if (!row.key) {
        return null;
      }
      return sheetKeys.push(row.key);
    });

    missingKeys = localesKeys.filter((x) => !sheetKeys.includes(x));

    if (!missingKeys.length) {
      console.log('No missing keys'.green);
    } else {
      console.log('Missing keys: ', missingKeys.join(',').cyan);
    }

    // await missingKeys.map(async (key) => {
    // const moreRows = await sheet.addRows([
    //   { name: 'Sergey Brin', email: 'sergey@google.com' },
    //   { name: 'Eric Schmidt', email: 'eric@google.com' },
    // ]);

    console.log('>>> missingKeys', missingKeys);

    const rowsKey = [];
    missingKeys.map((key) => {
      return rowsKey.push([key]);
    });

    await sheet.addRows(rowsKey);
    // await setTimeout(1000);
    // console.log(`${key} added !`.cyan);
    // });

    return;
  }
})();
