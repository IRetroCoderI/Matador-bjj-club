/* ============================================================
   MATADOR JIU-JITSU — script.js
   ------------------------------------------------------------
   All the JavaScript for the whole site lives in this one small
   file, and every page loads it. There are only two jobs here:

     1. Make the mobile hamburger menu open and close.
     2. Keep the copyright year in the footer up to date forever.

   Everything else on the site is plain HTML + CSS on purpose —
   less JavaScript means faster loads and fewer things to break.
   ============================================================ */

/* ------------------------------------------------------------
   1. HAMBURGER MENU
   ------------------------------------------------------------
   On phones the nav links hide inside a dropdown. The button with
   id="hamburger" toggles it. The actual opening/closing animation
   is done in CSS (see .site-nav in style.css) — all JS does is
   flip an "is-open" class on and off.
   ------------------------------------------------------------ */

// Grab the button and the nav menu from the page.
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('site-nav');

// Only wire things up if both elements exist (they should on every
// page, but this check means one missing id won't crash the script).
if (hamburger && nav) {

    // When the hamburger is tapped: open the menu if it's closed,
    // close it if it's open.
    hamburger.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('is-open'); // returns true if now open
        hamburger.classList.toggle('is-open', isOpen);  // morphs the icon into an X

        // Screen readers announce this attribute, so people using
        // assistive tech know whether the menu is expanded.
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Quality-of-life: tapping anywhere OUTSIDE the menu closes it,
    // so it never feels "stuck open".
    document.addEventListener('click', function (event) {
        const clickedInsideMenu = nav.contains(event.target);
        const clickedTheButton = hamburger.contains(event.target);

        if (!clickedInsideMenu && !clickedTheButton && nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Also close the menu when the Escape key is pressed — standard
    // behavior people expect from dropdowns.
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ------------------------------------------------------------
   2. AUTO-UPDATING COPYRIGHT YEAR
   ------------------------------------------------------------
   Every footer has a <span id="year"></span>. We fill it with the
   current year so nobody ever has to remember to bump "© 2026"
   by hand each January.
   ------------------------------------------------------------ */

// Find the span (if this page has one)...
const yearSpan = document.getElementById('year');

// ...and stamp the current year into it. new Date() is "right now"
// on the visitor's device; .getFullYear() pulls out just the year.
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   ADDING YOUR OWN JAVASCRIPT LATER?
   ------------------------------------------------------------
   Add it below this line and it'll run on every page (this file
   is loaded at the bottom of each one). Two tips:

   1. Wrap it in an if-check like the examples above, so pages
      that don't have your element won't throw errors:

        const thing = document.getElementById('my-thing');
        if (thing) {
            // ... your code ...
        }

   2. Keep it small. Everything visual on this site is done in
      CSS on purpose — reach for style.css first, and only use
      JavaScript when something truly needs to *react* to the
      visitor (clicks, typing, time).
   ------------------------------------------------------------ */
