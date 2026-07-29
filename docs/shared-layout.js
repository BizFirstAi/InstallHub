/**
 * Shared Layout Injector — InstallHub by BizFirstAi
 * Dynamically injects header and footer into all InstallHub pages.
 */

const SHARED_HEADER = `
<style>
  .b-mobile-menu { display: flex; flex-direction: column; overflow: hidden; }
  .b-mobile-nav { overflow-y: auto; flex: 1; }
</style>
<nav class="b-navbar">
  <div class="b-navbar-container">

    <a href="https://bizfirstai.com" class="b-navbar-logo" target="_blank" rel="noopener">
      <img src="https://bizfirstai.com/website/assets/Logo/logo.png" alt="InstallHub by BizFirstAi" class="b-logo-image">
    </a>

    <ul class="b-navbar-menu">
      <li><a href="./index.html" class="b-nav-link">Home</a></li>
      <li><a href="./features.html" class="b-nav-link">Features</a></li>
      <li><a href="./docs.html" class="b-nav-link">Docs</a></li>
      <li><a href="./changelog.html" class="b-nav-link">Changelog</a></li>
      <li><a href="https://community.bizfirstai.com" class="b-nav-link" target="_blank" rel="noopener">Community</a></li>
      <li><a href="./blueprint.html" class="b-nav-link">Blueprint</a></li>
    </ul>

    <div class="b-navbar-cta">
      <a href="https://bizfirstai.com/website/contact.html" class="b-btn b-btn-primary">Get Started</a>
    </div>

    <button class="b-hamburger" id="b-hamburger" aria-label="Open menu" aria-expanded="false">
      <span class="b-hamburger__line"></span>
      <span class="b-hamburger__line"></span>
      <span class="b-hamburger__line"></span>
    </button>

  </div>
</nav>

<!-- Mobile backdrop -->
<div class="b-mobile-backdrop" id="b-mobile-backdrop"></div>

<!-- Mobile drawer -->


<div class="b-mobile-menu" id="b-mobile-menu" aria-hidden="true">
  <div class="b-mobile-menu__header">
    <a href="https://bizfirstai.com" target="_blank" rel="noopener">
      <img src="https://bizfirstai.com/website/assets/Logo/logo.png" alt="InstallHub by BizFirstAi" style="height:32px;width:auto;">
    </a>
    <button class="b-mobile-menu__close" id="b-mobile-close" aria-label="Close menu">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="b-mobile-nav">
    <a href="./index.html" class="b-mobile-nav__link">Home</a>
    <a href="./features.html" class="b-mobile-nav__link">Features</a>
    <a href="./docs.html" class="b-mobile-nav__link">Docs</a>
    <a href="./changelog.html" class="b-mobile-nav__link">Changelog</a>
    <a href="https://community.bizfirstai.com" class="b-mobile-nav__link" target="_blank" rel="noopener">Community</a>
    <a href="./blueprint.html" class="b-mobile-nav__link">Blueprint</a>
  </nav>

  <div class="b-mobile-menu__cta">
    <a href="https://bizfirstai.com/website/contact.html" class="b-btn b-btn-primary">Get Started</a>
  </div>

</div>
`;

const SHARED_FOOTER = `
<div class="b-footer-container">

  <div class="b-footer-section">
    <div class="b-footer-brand">
      <img src="https://bizfirstai.com/website/assets/Logo/logo.png" alt="InstallHub by BizFirstAi" style="height: 32px; width: auto; margin-bottom: 1rem;">
      <p class="b-footer-tagline">Enterprise package management. Export, import, publish.</p>
    </div>
  </div>

  <div class="b-footer-section">
    <h4>InstallHub</h4>
    <ul>
      <li><a href="./features.html">Features</a></li>
      <li><a href="./docs.html">Docs</a></li>
      <li><a href="./changelog.html">Changelog</a></li>
      <li><a href="https://community.bizfirstai.com" target="_blank" rel="noopener">Community</a></li>
    </ul>
  </div>

  <div class="b-footer-section">
    <h4>Part of BizFirstAi Platform</h4>
    <ul>
      <li><a href="https://bizfirstai.com" target="_blank" rel="noopener">bizfirstai.com</a></li>
      <li><a href="https://bizfirstai.com/website/platform.html">Platform Overview</a></li>
      <li><a href="https://bizfirstai.com/website/pricing.html">Platform Pricing</a></li>
      <li><a href="https://bizfirstai.com/website/contact.html">Contact Sales</a></li>
    </ul>
  </div>

</div>

<div class="b-footer-bottom">
  <p>&copy; 2026 BizFirst LLC &middot; <a href="https://bizfirstai.com" target="_blank" rel="noopener">Back to BizFirstAi &#8599;</a></p>
</div>
`;

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.b-navbar-menu .b-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === `./${currentPage}` ||
      (currentPage === '' && href === './index.html')
    ) {
      link.classList.add('b-active');
    } else {
      link.classList.remove('b-active');
    }
  });
}

/**
 * Wire up mobile hamburger, backdrop, and close behaviour
 */
function initMobileNav() {
  const hamburger  = document.getElementById('b-hamburger');
  const mobileMenu = document.getElementById('b-mobile-menu');
  const backdrop   = document.getElementById('b-mobile-backdrop');
  const closeBtn   = document.getElementById('b-mobile-close');

  if (!hamburger || !mobileMenu || !backdrop) return;

  function openMenu() {
    hamburger.classList.add('b-hamburger--open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('b-mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('b-mobile-backdrop--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('b-hamburger--open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('b-mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('b-mobile-backdrop--visible');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('b-mobile-menu--open');
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close drawer when any link inside is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Inject on page load
document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = SHARED_HEADER;
  }

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = SHARED_FOOTER;
  }

  setActiveNavLink();
  initMobileNav();
});
