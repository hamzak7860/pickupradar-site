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
})();
