// Entry point of the static GitHub Pages showcase (npm run build:demo).
import { demoUser, demoCredentials } from './mockServer';
import './demo.css';

const SESSION_KEY = 'secretSomething';

// Every page load starts from the seed with the first demo user signed in.
const signInDemoUser = () => {
  const { user_uid, name } = demoUser();
  const uuidLocal = Array.from(user_uid).reverse().join('');
  try {
    localStorage.setItem(SESSION_KEY, uuidLocal);
  } catch {}
  if (!window.location.hash || window.location.hash === '#/')
    window.location.hash = `#/${name}`;
};

const mountBanner = () => {
  const banner = document.createElement('div');
  banner.id = 'demo-banner';
  const accounts = demoCredentials()
    .map(({ name, email, passwd }) => `<span><b>${name}</b>: ${email} / ${passwd}</span>`)
    .join('');
  banner.innerHTML = `
    <strong>Showcase mode</strong>
    <span>No server: data is kept in memory and resets on page reload.</span>
    ${accounts}
    <button type="button" aria-label="Hide demo banner">×</button>
  `;
  banner.querySelector('button').onclick = () => banner.remove();
  document.body.prepend(banner);
};

signInDemoUser();
mountBanner();
require('../index.jsx');
