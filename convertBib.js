const fs = require('fs');
const bibtexParse = require('bibtex-parse-js');

// Read your BibTeX file
const bibFile = fs.readFileSync('publications.bib', 'utf8');

// Parse BibTeX to JS objects
const entries = bibtexParse.toJSON(bibFile);

// Write JSON file
fs.writeFileSync('assets/data/publications.json', JSON.stringify(entries, null, 2));

console.log('publications.json generated!');