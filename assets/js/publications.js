const pubContainer = document.getElementById('publication-list');

// Fetch JSON
fetch('assets/data/publications.json')
  .then(res => res.json())
  .then(publications => {
    if (!publications || publications.length === 0) {
      pubContainer.innerHTML = "<p>No publications yet.</p>";
      return;
    }

    publications.forEach(pub => {
      const tags = pub.entryTags || {};
      const title = tags.title || 'Untitled';
      const authors = tags.author || 'Unknown';
      const year = tags.year || '';
      const url = tags.url || '';

      const div = document.createElement('div');
      div.className = 'pub-card';
      div.innerHTML = `
        <h3>${title}</h3>
        <p>${authors} (${year})</p>
        ${url ? `<a href="${url}" target="_blank">View Paper</a>` : ''}
      `;
      pubContainer.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Error loading publications:', err);
    pubContainer.innerHTML = "<p>Failed to load publications.</p>";
  });