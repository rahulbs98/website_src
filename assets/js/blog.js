// assets/js/blog.js

document.addEventListener("DOMContentLoaded", async () => {
  const feedUrl = "https://rahulsatish98.substack.com/feed"; // RSS feed
  const bannersContainer = document.getElementById("blog-banners");
  const placeholder = document.getElementById("blog-placeholder");

  try {
    // Fetch RSS feed as text
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
    if (!response.ok) throw new Error("Failed to fetch feed");

    const data = await response.json();
    const posts = data.items || [];

    if (posts.length === 0) {
      placeholder.style.display = "block";
      return;
    }

    posts.forEach(post => {
      // Try to get image from content, else placeholder
      let imgSrc = "";
      const imgMatch = post.content.match(/<img.*?src="(.*?)"/);
      imgSrc = imgMatch ? imgMatch[1] : "assets/images/blog-placeholder.jpg";

      // Create card
      const card = document.createElement("a");
      card.className = "blog-card";
      card.href = post.link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      card.innerHTML = `
        <img src="${imgSrc}" alt="${post.title}">
        <h3>${post.title}</h3>
      `;

      bannersContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading blog posts:", err);
    placeholder.textContent = "Could not load blog posts at this time.";
    placeholder.style.display = "block";
  }
});