(function () {
  'use strict';

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  var gallery = document.querySelector('[data-gallery]');
  var lightbox = document.getElementById('lightbox');
  if (!gallery || !lightbox) return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll('.g-item'));
  var lbImg = lightbox.querySelector('img');
  var lbCap = lightbox.querySelector('figcaption');
  var current = 0;
  var lastFocus = null;

  function show(index) {
    current = (index + items.length) % items.length;
    var img = items[current].querySelector('img');
    var cap = items[current].querySelector('.g-cap');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt');
    lbCap.textContent = cap ? cap.textContent : '';
  }

  function open(index) {
    lastFocus = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lb-close').focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (btn, i) {
    btn.addEventListener('click', function () { open(i); });
  });
  lightbox.querySelector('.lb-close').addEventListener('click', close);
  lightbox.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  lightbox.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Tab') {
      var focusables = lightbox.querySelectorAll('button');
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
