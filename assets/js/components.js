/**
 * Component Library - Reusable SVG icons and components
 */

const ICONS = {
  github: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="GitHub"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,

  linkedin: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,

  email: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Email"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,

  signal: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Signal"><path d="M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125"/></svg>`,

  scholar: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Google Scholar"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>`,

  dblp: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="DBLP"><path d="M3.075.002c-.096.013-.154.092-.094.31L4.97 7.73 3.1 8.6s-.56.26-.4.85l2.45 9.159s.16.59.72.33l6.169-2.869 1.3-.61s.52-.24.42-.79l-.01-.06-1.13-4.22-.658-2.45-.672-2.49v-.04s-.16-.59-.84-1L3.5.141s-.265-.16-.425-.139zM18.324 5.03a.724.724 0 0 0-.193.06l-5.602 2.6.862 3.2 1.09 4.08.01.06c.05.47-.411.79-.411.79l-1.88.87.5 1.89.04.1c.07.17.28.6.81.91l6.95 4.269s.68.41.52-.17l-1.981-7.4 1.861-.86s.56-.26.4-.85L18.85 5.42s-.116-.452-.526-.39z"/></svg>`,

  publications: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Publications"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14 2v6h6" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,

  blog: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Blog"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,

  albums: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" title="Albums"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
};

/**
 * Social Links Configuration
 */
const SOCIAL_LINKS = [
  { icon: 'github', url: 'https://github.com/rahulbs98', label: 'GitHub' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/in/rahulbs98', label: 'LinkedIn' },
  { icon: 'email', url: 'mailto:rahs@itu.dk', label: 'Email' },
  { icon: 'signal', url: 'https://signal.org', label: 'Signal' },
  { icon: 'scholar', url: 'https://scholar.google.com/citations?user=YOUR_ID', label: 'Google Scholar' },
  { icon: 'dblp', url: 'https://dblp.org/pid/XX/XXX.html', label: 'DBLP' },
];

/**
 * Generate Social Links HTML
 */
function generateSocialLinks() {
  return SOCIAL_LINKS.map(link => 
    `<a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
      ${ICONS[link.icon]}
    </a>`
  ).join('');
}

/**
 * Populate a specific element with social links (useful for hero section)
 */
function populateSocialLinks(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = generateSocialLinks();
  }
}

/**
 * Generate Footer HTML
 */
function generateFooter() {
  const year = new Date().getFullYear();
  return `
    <footer>
      <div class="footer-content">
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="publications.html">Publications</a>
          <a href="blog.html">Blog</a>
          <a href="mailto:rahs@itu.dk">Contact</a>
        </div>
        <div class="footer-social">
          <div class="social-links">
            ${generateSocialLinks()}
          </div>
        </div>
        <p>&copy; ${year} Rahul Satish</p>
      </div>
    </footer>
  `;
}

/**
 * Inject Footer on DOM Ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Populate hero social links if the element exists
  populateSocialLinks('hero-social-links');
  
  // Check if footer already exists to avoid duplicates
  if (!document.querySelector('footer')) {
    document.body.insertAdjacentHTML('beforeend', generateFooter());
  }
});
