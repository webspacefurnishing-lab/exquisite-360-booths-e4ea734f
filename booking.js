(function () {
  'use strict';

  var form = document.getElementById('bookingForm');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.step'));
  var progress = Array.prototype.slice.call(document.querySelectorAll('[data-progress]'));
  var backBtn = form.querySelector('[data-back]');
  var nextBtn = form.querySelector('[data-next]');
  var submitBtn = form.querySelector('[data-submit]');
  var confirmation = document.getElementById('confirmation');
  var current = 0;

  // Preselect booth from link
  var params = new URLSearchParams(window.location.search);
  var map = { '360': '360 Booth', selfie: 'Selfie Booth', vintage: 'Vintage Pod' };
  var pre = map[(params.get('booth') || '').toLowerCase()];
  if (pre) {
    var radio = form.querySelector('input[name="booth"][value="' + pre + '"]');
    if (radio) radio.checked = true;
  }

  // Earliest date is today
  var dateInput = document.getElementById('eventDate');
  var t = new Date();
  var pad = function (n) { return String(n).padStart(2, '0'); };
  dateInput.min = t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());

  var labels = [
    ['booth', 'Booth'],
    ['hours', 'Booth hire length'],
    ['extras', 'Interested in'],
    ['eventType', 'Event type'],
    ['eventDate', 'Event date'],
    ['startTime', 'Start time'],
    ['endTime', 'Finish time'],
    ['venueName', 'Venue'],
    ['venueAddress', 'Venue address'],
    ['venuePostcode', 'Postcode'],
    ['guests', 'Guests (approx.)'],
    ['setting', 'Indoor or outdoor'],
    ['theme', 'Theme and overlay wording'],
    ['fullName', 'Name'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['contactPref', 'Preferred contact'],
    ['heard', 'Heard about us via'],
    ['notes', 'Notes']
  ];

  function showStep(i) {
    current = i;
    steps.forEach(function (s, idx) {
      s.hidden = idx !== i;
      s.classList.toggle('is-active', idx === i);
    });
    progress.forEach(function (p, idx) {
      p.classList.toggle('is-active', idx === i);
      p.classList.toggle('is-done', idx < i);
      if (idx === i) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current');
    });
    backBtn.hidden = i === 0;
    nextBtn.hidden = i === steps.length - 1;
    submitBtn.hidden = i !== steps.length - 1;
    if (i === steps.length - 1) renderSummary(document.getElementById('summary'));
    var legend = steps[i].querySelector('legend');
    if (legend) {
      legend.setAttribute('tabindex', '-1');
      legend.focus({ preventScroll: true });
    }
    var top = form.getBoundingClientRect().top + window.pageYOffset - 120;
    if (window.pageYOffset > top) window.scrollTo(0, top);
  }

  function validateStep(i) {
    var step = steps[i];
    var ok = true;
    var firstBad = null;

    if (i === 0) {
      var err = step.querySelector('[data-error="booth"]');
      var picked = form.querySelector('input[name="booth"]:checked');
      err.hidden = !!picked;
      if (!picked) { ok = false; firstBad = form.querySelector('input[name="booth"]'); }
    }

    step.querySelectorAll('input[required]:not([type=radio]), select[required], textarea[required]').forEach(function (el) {
      var valid = el.checkValidity();
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid) {
        ok = false;
        if (!firstBad) firstBad = el;
      }
    });

    if (!ok && firstBad) {
      if (firstBad.type !== 'radio' && firstBad.reportValidity) firstBad.reportValidity();
      firstBad.focus();
    }
    return ok;
  }

  function collect() {
    var data = {};
    labels.forEach(function (pair) {
      var key = pair[0];
      if (key === 'extras') {
        var vals = Array.prototype.map.call(form.querySelectorAll('input[name="extras"]:checked'), function (c) { return c.value; });
        data[key] = vals.join(', ');
      } else if (key === 'booth') {
        var b = form.querySelector('input[name="booth"]:checked');
        data[key] = b ? b.value : '';
      } else {
        var el = form.elements[key];
        data[key] = el ? String(el.value).trim() : '';
      }
    });
    if (data.eventDate) {
      var d = new Date(data.eventDate + 'T12:00:00');
      data.eventDate = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    return data;
  }

  function renderSummary(target) {
    var data = collect();
    target.innerHTML = '';
    labels.forEach(function (pair) {
      var val = data[pair[0]];
      if (!val) return;
      var dt = document.createElement('dt');
      dt.textContent = pair[1];
      var dd = document.createElement('dd');
      dd.textContent = val;
      target.appendChild(dt);
      target.appendChild(dd);
    });
    return data;
  }

  function summaryText(ref, data) {
    var lines = ['Exquisite 360 Booths booking request', 'Reference: ' + ref];
    labels.forEach(function (pair) {
      if (data[pair[0]]) lines.push(pair[1] + ': ' + data[pair[0]]);
    });
    return lines.join('\n');
  }

  nextBtn.addEventListener('click', function () {
    if (validateStep(current)) showStep(current + 1);
  });
  backBtn.addEventListener('click', function () { showStep(current - 1); });

  form.querySelectorAll('input[name="booth"]').forEach(function (r) {
    r.addEventListener('change', function () {
      form.querySelector('[data-error="booth"]').hidden = true;
    });
  });
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      e.target.setAttribute('aria-invalid', 'false');
    }
  });

  var lastText = '';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    for (var i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) { showStep(i); validateStep(i); return; }
    }
    var now = new Date();
    var ref = 'EXQ-' + String(now.getFullYear()).slice(2) + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    var data = renderSummary(document.getElementById('finalSummary'));
    document.getElementById('refCode').textContent = ref;
    lastText = summaryText(ref, data);

    try {
      var saved = JSON.parse(localStorage.getItem('exq-bookings') || '[]');
      saved.push({ ref: ref, createdAt: now.toISOString(), details: data });
      localStorage.setItem('exq-bookings', JSON.stringify(saved));
    } catch (err) { /* storage unavailable */ }

    form.hidden = true;
    progress.forEach(function (p) { p.classList.remove('is-active'); p.classList.add('is-done'); p.removeAttribute('aria-current'); });
    confirmation.hidden = false;
    confirmation.focus();
  });

  document.getElementById('copySummary').addEventListener('click', function () {
    var status = document.getElementById('copyStatus');
    function done() { status.textContent = 'Summary copied - paste it into your message to us.'; }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = lastText;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { status.textContent = 'Please select and copy the summary above.'; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(lastText).then(done, fallback);
    } else {
      fallback();
    }
  });

  document.getElementById('newBooking').addEventListener('click', function () {
    form.reset();
    form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
    confirmation.hidden = true;
    document.getElementById('copyStatus').textContent = '';
    form.hidden = false;
    showStep(0);
  });

  showStep(0);
  window.scrollTo(0, 0);
})();
