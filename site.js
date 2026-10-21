// PickupRadar website: header gets more solid once the page scrolls, and the
// example phone picture scales to fit narrow screens (same rule as the live preview).
(function () {
  var header = document.querySelector('[data-site-header]');
  if (header) {
    var update = function () {
      header.classList.toggle('is-scrolled', (window.scrollY || window.pageYOffset) > 8);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  var examples = document.querySelectorAll('.w-example .preview-root');
  if (examples.length) {
    var fit = function () {
      var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      for (var i = 0; i < examples.length; i++) {
        var phoneWidth = examples[i].offsetWidth || 418;
        var scale = Math.min(1, Math.max(0.5, (viewportWidth - 24) / phoneWidth));
        examples[i].style.setProperty('--preview-fit-scale', String(scale));
      }
    };
    fit();
    window.addEventListener('resize', fit);
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Opening a question near the bottom of the screen scrolls its answer into view.
  var questions = document.querySelectorAll('.w-faq details');
  for (var q = 0; q < questions.length; q++) {
    questions[q].addEventListener('toggle', function (event) {
      var item = event.currentTarget;
      if (!item.open) return;
      var box = item.getBoundingClientRect();
      if (box.bottom > window.innerHeight) {
        item.scrollIntoView({ block: box.height > window.innerHeight ? 'start' : 'end', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  }

  // Back to top, like the app: shows after one screen of scrolling on long pages.
  if (!document.body.classList.contains('page-live-preview')) {
    var top = document.createElement('button');
    top.type = 'button';
    top.className = 'w-top';
    top.hidden = true;
    top.setAttribute('aria-label', 'Back to top');
    top.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M11 20V7.4l-5.6 5.7L4 11.7 12 3.6l8 8.1-1.4 1.4L13 7.4V20z"/></svg>';
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var skip = document.querySelector('.w-brand');
      if (skip) skip.focus({ preventScroll: true });
    });
    document.body.appendChild(top);
    var updateTop = function () {
      var y = window.scrollY || window.pageYOffset;
      top.hidden = y <= window.innerHeight;
    };
    updateTop();
    window.addEventListener('scroll', updateTop, { passive: true });
  }
})();
