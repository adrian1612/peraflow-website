/* Leave empty until PeraFlow has a verified, public Google Play listing.
 * This one value updates every download CTA and the availability copy.
 * Use the full HTTPS listing URL supplied by Google Play; see README.md.
 */
const PLAY_STORE_URL = '';

(() => {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Progressive enhancement: the full navigation is visible without JS.
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  const compactLayout = window.matchMedia('(max-width: 900px)');

  if (header && menu && nav) {
    const closeMenu = (restoreFocus = false) => {
      menu.setAttribute('aria-expanded', 'false');
      nav.hidden = compactLayout.matches;
      if (restoreFocus) menu.focus();
    };
    header.classList.add('nav-enhanced');
    menu.hidden = false;
    closeMenu();

    menu.addEventListener('click', () => {
      const expanded = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!expanded));
      nav.hidden = expanded;
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && compactLayout.matches) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target) && menu.getAttribute('aria-expanded') === 'true') closeMenu();
    });
    compactLayout.addEventListener('change', () => closeMenu());
  }

  // The safe default never creates or guesses a store URL.
  if (!PLAY_STORE_URL) return;
  let listing;
  try {
    listing = new URL(PLAY_STORE_URL);
    if (listing.protocol !== 'https:' || listing.hostname !== 'play.google.com' ||
        listing.pathname !== '/store/apps/details' ||
        listing.searchParams.get('id') !== 'com.adrianjaspio.peraflow') return;
  } catch {
    return;
  }

  document.querySelectorAll('[data-play-link], [data-live-download]').forEach((link) => {
    link.href = listing.href;
    link.hidden = false;
  });
  document.querySelectorAll('[data-play-copy]').forEach((text) => { text.textContent = 'Get PeraFlow'; });
  document.querySelectorAll('[data-play-kicker]').forEach((text) => { text.textContent = 'GET IT ON'; });
  document.querySelectorAll('[data-store-status]').forEach((status) => { status.hidden = true; });
  const description = document.querySelector('[data-launch-description]');
  if (description) description.textContent = 'A clearer view of your everyday money. PeraFlow is available for Android on Google Play.';
  const answer = document.querySelector('[data-launch-answer]');
  if (answer) answer.textContent = 'PeraFlow is available for Android on Google Play. Use any Google Play download link on this page to visit the public listing.';
})();
