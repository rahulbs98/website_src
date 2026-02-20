const fs = require('fs');
const https = require('https');
const bibtexParse = require('bibtex-parse-js');

const DBLP_BIB_URL = 'https://dblp.org/pid/370/6614.bib';
const BIB_PATH = 'publications.bib';
const JSON_PATH = 'assets/data/publications.json';

function fetchBibtex(url) {
	return new Promise((resolve, reject) => {
		https.get(url, res => {
			if (res.statusCode !== 200) {
				reject(new Error(`DBLP fetch failed: ${res.statusCode}`));
				return;
			}

			let data = '';
			res.on('data', chunk => {
				data += chunk;
			});
			res.on('end', () => resolve(data));
		}).on('error', reject);
	});
}

async function buildPublications() {
	console.log('Fetching BibTeX from DBLP...');
	const bibFile = await fetchBibtex(DBLP_BIB_URL);
	fs.writeFileSync(BIB_PATH, bibFile);
	console.log(`Updated ${BIB_PATH}`);

	const entries = bibtexParse.toJSON(bibFile);
	fs.writeFileSync(JSON_PATH, JSON.stringify(entries, null, 2));
	console.log(`Generated ${JSON_PATH}`);
}

buildPublications().catch(error => {
	console.error('Failed to build publications:', error.message);
	process.exit(1);
});