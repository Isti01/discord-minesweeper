const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs/promises');

const dirPath = './assets';

async function processAssets(file) {
  let svg = cheerio.load(await fs.readFile(path.join(dirPath, file), 'utf-8'), {
    xml: true,
  });

  svg('svg').removeAttr('width').removeAttr('height');

  const content = svg.xml().trim().substr('<svg'.length);
  const name = path.basename(file, '.svg');

  return { [name]: content };
}

fs.readdir(dirPath)
  .then((files) => Promise.all(files.map(processAssets)))
  .then((svgs) => svgs.reduce((prev, curr) => ({ ...prev, ...curr }), {}))
  .then((json) => ({ sprites: json }))
  .then((json) => fs.writeFile('./out/config.json', JSON.stringify(json)))
  .then(() => console.log( 'finished :)'));
