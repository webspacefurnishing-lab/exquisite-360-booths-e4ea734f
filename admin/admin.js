(function () {
  'use strict';

  /* ---------- seeded generator so every page sees identical records ---------- */
  var seed = 360721;
  function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
  function pick(a) { return a[Math.floor(rnd() * a.length)]; }
  function weighted(pairs) { var tot = 0, i; for (i = 0; i < pairs.length; i++) tot += pairs[i][1]; var r = rnd() * tot; for (i = 0; i < pairs.length; i++) { r -= pairs[i][1]; if (r <= 0) return pairs[i][0]; } return pairs[0][0]; }
  function pad(n) { return String(n).padStart(2, '0'); }

  var TODAY = '2026-11-21';

  /* ---------- hire rates (booths offered on the website) ---------- */
  var prices = [
    { group: '360 Booth', key: '360', items: [
      { id: 'b360-1', name: '1 hour hire', hours: 1, price: 250, note: 'Video clips with personalised overlay' },
      { id: 'b360-2', name: '2 hours hire', hours: 2, price: 350, note: 'Video clips with personalised overlay' },
      { id: 'b360-3', name: '3 hours hire', hours: 3, price: 425, note: 'Video clips with personalised overlay' },
      { id: 'b360-4', name: '4 hours hire', hours: 4, price: 495, note: 'Video clips with personalised overlay' },
      { id: 'b360-5', name: '5 hours hire', hours: 5, price: 560, note: 'Video clips with personalised overlay' }
    ] },
    { group: 'Selfie Booth', key: 'selfie', items: [
      { id: 'bsel-1', name: '1 hour hire', hours: 1, price: 200, note: 'Photos with event title and date' },
      { id: 'bsel-2', name: '2 hours hire', hours: 2, price: 300, note: 'Photos with event title and date' },
      { id: 'bsel-3', name: '3 hours hire', hours: 3, price: 375, note: 'Photos with event title and date' },
      { id: 'bsel-4', name: '4 hours hire', hours: 4, price: 440, note: 'Photos with event title and date' },
      { id: 'bsel-5', name: '5 hours hire', hours: 5, price: 500, note: 'Photos with event title and date' }
    ] },
    { group: 'Vintage Pod', key: 'vintage', items: [
      { id: 'bvin-1', name: '1 hour hire', hours: 1, price: 225, note: 'Classic photo pod' },
      { id: 'bvin-2', name: '2 hours hire', hours: 2, price: 325, note: 'Classic photo pod' },
      { id: 'bvin-3', name: '3 hours hire', hours: 3, price: 400, note: 'Classic photo pod' },
      { id: 'bvin-4', name: '4 hours hire', hours: 4, price: 470, note: 'Classic photo pod' },
      { id: 'bvin-5', name: '5 hours hire', hours: 5, price: 530, note: 'Classic photo pod' }
    ] },
    { group: 'Add-ons', key: 'extras', items: [
      { id: 'ex-strips', name: 'Customised print strips', hours: 0, price: 95, note: 'Event name and date on every strip' },
      { id: 'ex-overlay', name: 'Personalised overlay (names, date or monogram)', hours: 0, price: 40, note: 'For 360 clips or selfie photos' },
      { id: 'ex-backdrop', name: 'Backdrop styling', hours: 0, price: 75, note: 'Rose flower wall, white or black and gold' }
    ] }
  ];
  var boothKey = { '360 Booth': '360', 'Selfie Booth': 'selfie', 'Vintage Pod': 'vintage' };
  function rate(booth, hours) { var g = prices.filter(function (p) { return p.group === booth; })[0]; return g.items[hours - 1].price; }
  var extraPrice = { 'Customised print strips': 95, 'Personalised overlay': 40, 'Backdrop styling': 75 };

  /* ---------- reference lists ---------- */
  var venues = [
    ['Hampton Manor', 'Hampton-in-Arden', 'B92 0EN'], ['Moxhull Hall', 'Sutton Coldfield', 'B76 9QT'], ['Birmingham Botanical Gardens', 'Edgbaston', 'B15 3TR'],
    ['The Belfry', 'Wishaw', 'B76 9PR'], ['Edgbaston Park Hotel', 'Edgbaston', 'B15 2TU'], ['Hogarths Stone Manor', 'Kidderminster', 'DY10 4PJ'],
    ['Coombe Abbey', 'Coventry', 'CV3 2AB'], ['The Mill Barns', 'Bridgnorth', 'WV16 6AN'], ['Fazeley Studios', 'Digbeth', 'B5 5SE'],
    ['Aston Villa Park Suites', 'Aston', 'B6 6HE'], ['New Hall Hotel', 'Sutton Coldfield', 'B76 1QX'], ['Hagley Rugby Club', 'Stourbridge', 'DY9 0LP'],
    ['The Old Rectory Handsworth', 'Handsworth', 'B21 9DD'], ['Dudley Town Hall', 'Dudley', 'DY1 1HP'], ['Walsall Arena Suite', 'Walsall', 'WS1 4LJ'],
    ['Solihull Moors Banqueting', 'Solihull', 'B90 4EE'], ['Ragley Hall', 'Alcester', 'B49 5NJ'], ['Wolverhampton Racecourse', 'Wolverhampton', 'WV6 0PE'],
    ['The Grand Hotel', 'Birmingham', 'B3 2BU'], ['Leicester Marriott', 'Leicester', 'LE19 1SW'], ['Manchester Hall', 'Manchester', 'M2 3BA']
  ];
  var firsts = ['Amara', 'Jordan', 'Priya', 'Callum', 'Sienna', 'Hassan', 'Chloe', 'Darnell', 'Megan', 'Imran', 'Leah', 'Tobias', 'Nadia', 'Reece', 'Harpreet', 'Olivia', 'Kwame', 'Ellie', 'Zain', 'Grace', 'Marcus', 'Aisha', 'Bethany', 'Rohan', 'Keisha', 'Liam', 'Sofia', 'Usman', 'Danielle', 'Tyrone', 'Hollie', 'Arjun', 'Jade', 'Connor', 'Simran', 'Natasha', 'Elliot', 'Fatima', 'Ruby', 'Andre'];
  var lasts = ['Okafor', 'Bennett', 'Sandhu', 'Whitmore', 'Hussain', 'Clarke', 'Mensah', 'Patel', 'Ellis', 'Begum', 'Hartley', 'Campbell', 'Kaur', 'Doyle', 'Reid', 'Akhtar', 'Fletcher', 'Gill', 'Osei', 'Turner', 'Malik', 'Brennan', 'Thompson', 'Rahman', 'Lowe', 'Francis', 'Bains', 'Morgan', 'Adeyemi', 'Shaw'];
  var eventTypes = [['Wedding', 34], ['Birthday', 22], ['Engagement', 7], ['Anniversary', 5], ['Corporate event', 9], ['Awards evening', 5], ['Ball or gala', 6], ['Christmas party', 0], ['Other', 3]];
  var channels = [['Instagram', 42], ['Facebook', 24], ['Recommendation', 18], ['Saw you at an event', 12], ['Other', 4]];
  var contactPrefs = [['Instagram message', 45], ['Facebook message', 22], ['Email', 18], ['Phone call or text', 15]];
  var themes = ['Black and gold', 'Blush pink florals', 'Navy and gold', 'White and silver', 'Emerald and gold', 'Rose gold', 'Lilac and white', 'Red and black', 'Champagne and ivory', 'Company branding'];
  var starts = ['18:00', '19:00', '19:30', '20:00', '20:30', '21:00', '15:00', '16:00', '13:00'];

  /* customer pool, some come back */
  var customers = [];
  var used = {};
  while (customers.length < 150) {
    var nm = pick(firsts) + ' ' + pick(lasts);
    if (used[nm]) continue; used[nm] = 1;
    customers.push({ id: 'C' + (1001 + customers.length), name: nm, contactPref: weighted(contactPrefs), heard: weighted(channels), phone: '07' + (700 + Math.floor(rnd() * 299)) + ' ' + (100000 + Math.floor(rnd() * 899999)) });
  }

  /* months: Dec 2025 to Jan 2027, counts per month (bookings) */
  var months = [
    ['2025-12', 13], ['2026-01', 5], ['2026-02', 6], ['2026-03', 8], ['2026-04', 9], ['2026-05', 12], ['2026-06', 15],
    ['2026-07', 16], ['2026-08', 15], ['2026-09', 13], ['2026-10', 11], ['2026-11', 12], ['2026-12', 14], ['2027-01', 4]
  ];
  var bookings = [];
  var custIdx = 0;
  months.forEach(function (m) {
    var y = +m[0].slice(0, 4), mo = +m[0].slice(5, 7);
    var dim = new Date(y, mo, 0).getDate();
    for (var i = 0; i < m[1]; i++) {
      var day; var tries = 0;
      do { day = 1 + Math.floor(rnd() * dim); var dow = new Date(y, mo - 1, day).getDay(); tries++; } while (tries < 8 && !(dow === 5 || dow === 6 || (dow === 0 && rnd() < .5) || rnd() < .15));
      var date = y + '-' + pad(mo) + '-' + pad(day);
      var isDec = mo === 12;
      var et = isDec && rnd() < .55 ? 'Christmas party' : weighted(eventTypes);
      var booth = weighted([['360 Booth', 50], ['Selfie Booth', 34], ['Vintage Pod', 16]]);
      var hours = weighted([[1, 4], [2, 26], [3, 38], [4, 22], [5, 10]]);
      var extras = [];
      if (booth !== '360 Booth' ? rnd() < .78 : rnd() < .2) extras.push('Customised print strips');
      if (rnd() < (booth === '360 Booth' ? .7 : .35)) extras.push('Personalised overlay');
      if (rnd() < .4) extras.push('Backdrop styling');
      var cust = custIdx < customers.length && rnd() > .1 ? customers[custIdx++] : customers[Math.floor(rnd() * Math.max(custIdx, 1))];
      var v = (et === 'Corporate event' || et === 'Awards evening') && rnd() < .5 ? pick(venues.slice(17)) : pick(venues);
      var hire = rate(booth, hours);
      var ex = extras.reduce(function (s, e) { return s + extraPrice[e]; }, 0);
      var travel = /Leicester|Manchester/.test(v[1]) ? 60 : 0;
      var status;
      if (date < TODAY) status = rnd() < .03 ? 'Cancelled' : 'Completed';
      else if (date <= '2026-11-30') status = 'Confirmed';
      else status = weighted([['Confirmed', 3], ['Deposit paid', 5], ['Pending', 2]]);
      var st = et === 'Wedding' || et === 'Birthday' ? pick(starts.slice(0, 6)) : pick(starts);
      var sh = +st.slice(0, 2) + hours; var end = pad(sh % 24) + st.slice(2);
      bookings.push({
        ref: 'EXQ-' + String(y).slice(2) + pad(mo) + pad(day) + '-' + Math.floor(rnd() * 46656).toString(36).toUpperCase().padStart(3, 'K'),
        date: date, start: st, end: end, hours: hours, booth: booth, boothKey: boothKey[booth], extras: extras,
        eventType: et, venue: v[0], town: v[1], postcode: v[2], guests: 40 + Math.floor(rnd() * 37) * 5,
        setting: rnd() < .9 ? 'Indoor' : 'Outdoor (covered)', theme: pick(themes),
        customerId: cust.id, customer: cust.name, contactPref: cust.contactPref, heard: cust.heard,
        hirePrice: hire, extrasPrice: ex, travel: travel, total: status === 'Cancelled' ? 0 : hire + ex + travel,
        deposit: status === 'Pending' ? 0 : 100, status: status
      });
    }
  });
  bookings.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : a.start < b.start ? -1 : 1; });

  /* customer roll-ups */
  customers = customers.filter(function (c) { return bookings.some(function (b) { return b.customerId === c.id; }); });
  customers.forEach(function (c) {
    var mine = bookings.filter(function (b) { return b.customerId === c.id; });
    c.bookings = mine.length;
    c.spend = mine.reduce(function (s, b) { return s + b.total; }, 0);
    c.first = mine[0].date; c.last = mine[mine.length - 1].date;
    c.refs = mine.map(function (b) { return b.ref; });
  });

  /* revenue: last 12 months Dec 2025 - Nov 2026, earned on event date, cancelled excluded */
  var revMonths = months.slice(0, 12).map(function (m) {
    var list = bookings.filter(function (b) { return b.date.slice(0, 7) === m[0] && b.status !== 'Cancelled'; });
    return { month: m[0], bookings: list.length, revenue: list.reduce(function (s, b) { return s + b.total; }, 0), hire: list.reduce(function (s, b) { return s + b.hirePrice; }, 0), extras: list.reduce(function (s, b) { return s + b.extrasPrice; }, 0) };
  });

  window.ADMIN_DATA = {
    business: { name: 'Exquisite 360 Booths', base: 'Birmingham', area: 'West Midlands & Nationwide', logo: '../source-facebook/assets/image-1.jpg', currency: 'GBP' },
    today: TODAY,
    prices: prices,
    booths: ['360 Booth', 'Selfie Booth', 'Vintage Pod'],
    extras: ['Customised print strips', 'Personalised overlay', 'Backdrop styling'],
    eventTypes: eventTypes.map(function (e) { return e[0]; }),
    channels: channels.map(function (e) { return e[0]; }),
    statuses: ['Completed', 'Confirmed', 'Deposit paid', 'Pending', 'Cancelled'],
    venues: venues.map(function (v) { return { name: v[0], town: v[1], postcode: v[2] }; }),
    bookings: bookings,
    customers: customers,
    revenueMonths: revMonths
  };

  /* ---------- helpers ---------- */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var ADM = {
    MONTHS: MONTHS,
    money: function (n, dp) { return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 }); },
    parse: function (iso) { return new Date(iso + 'T12:00:00'); },
    date: function (iso, opts) { return ADM.parse(iso).toLocaleDateString('en-GB', opts || { day: 'numeric', month: 'short', year: 'numeric' }); },
    dateLong: function (iso) { return ADM.date(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); },
    monthLabel: function (ym, short) { var m = MONTHS[+ym.slice(5, 7) - 1]; return (short ? m.slice(0, 3) : m) + ' ' + (short ? ym.slice(2, 4) : ym.slice(0, 4)); },
    pct: function (a, b) { return b ? ((a - b) / b) * 100 : 0; },
    sum: function (arr, k) { return arr.reduce(function (s, x) { return s + (typeof k === 'function' ? k(x) : x[k]); }, 0); },
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    statusClass: function (s) { return 'adm-badge adm-badge-' + ({ 'Completed': 'completed', 'Confirmed': 'confirmed', 'Deposit paid': 'deposit', 'Pending': 'pending', 'Cancelled': 'cancelled' }[s] || 'confirmed'); },
    badge: function (s) { return '<span class="' + ADM.statusClass(s) + '">' + ADM.esc(s) + '</span>'; },
    change: function (p) { var up = p >= 0; return '<span class="adm-change ' + (up ? 'adm-up' : 'adm-down') + '"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="' + (up ? 'M6 2l4 6H2z' : 'M6 10L2 4h8z') + '" fill="currentColor"/></svg>' + (up ? '+' : '') + p.toFixed(1) + '%</span>'; },
    groupBy: function (arr, fn) { var o = {}; arr.forEach(function (x) { var k = fn(x); (o[k] = o[k] || []).push(x); }); return o; },
    active: function () { return window.ADMIN_DATA.bookings.filter(function (b) { return b.status !== 'Cancelled'; }); },
    between: function (from, to) { return ADM.active().filter(function (b) { return b.date >= from && b.date <= to; }); },
    toast: function (msg) {
      var t = document.getElementById('adm-toast');
      if (!t) { t = document.createElement('div'); t.id = 'adm-toast'; t.className = 'adm-toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
      t.textContent = msg; t.classList.add('adm-show');
      clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('adm-show'); }, 3200);
    }
  };

  /* ---------- icons ---------- */
  var I = {
    dash: '<path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    cal: '<rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    rev: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/>',
    users: '<circle cx="9" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M16 4.8a3.3 3.3 0 010 6.4M18 14.8c1.8.7 3 2.4 3.5 5.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    site: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    trash: '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    prev: '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    next: '<path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
  };
  ADM.icon = function (name, cls) { return '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '>' + (I[name] || '') + '</svg>'; };

  ADM.pages = [
    { href: 'index.html', label: 'Dashboard', icon: 'dash' },
    { href: 'bookings.html', label: 'Bookings', icon: 'cal' },
    { href: 'revenue.html', label: 'Revenue Analysis', icon: 'rev' },
    { href: 'rates.html', label: 'Booth Hire Rates', icon: 'tag' },
    { href: 'customers.html', label: 'Customers', icon: 'users' }
  ];

  /* Renders sidebar into <aside id="adm-side" class="adm-side"></aside> */
  ADM.renderNav = function (current) {
    var side = document.getElementById('adm-side');
    if (!side) return;
    current = current || (location.pathname.split('/').pop() || 'index.html');
    var links = ADM.pages.map(function (p) {
      return '<a class="adm-nav-link" href="' + p.href + '"' + (p.href === current ? ' aria-current="page"' : '') + '>' + ADM.icon(p.icon) + p.label + '</a>';
    }).join('');
    side.innerHTML =
      '<a class="adm-brand" href="index.html"><img src="../source-facebook/assets/image-1.jpg" alt="Exquisite 360 Booths logo" width="48" height="48"><span class="adm-brand-text"><strong>Exquisite 360 Booths</strong><small>Owner admin</small></span></a>' +
      '<button type="button" class="adm-btn adm-btn-ghost adm-btn-sm adm-menu-btn" aria-expanded="false" aria-controls="adm-nav">' + ADM.icon('menu') + 'Menu</button>' +
      '<nav class="adm-nav" id="adm-nav" aria-label="Admin">' + links + '<span class="adm-nav-sep" aria-hidden="true"></span><a class="adm-nav-link" href="../index.html">' + ADM.icon('site') + 'View website</a></nav>' +
      '<p class="adm-side-foot">Birmingham &middot; West Midlands &amp; Nationwide</p>';
    var btn = side.querySelector('.adm-menu-btn');
    btn.addEventListener('click', function () { var o = side.classList.toggle('adm-open'); btn.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  };

  /* Vertical bar chart: ADM.barChart(el, labels, values, {format}) */
  ADM.barChart = function (el, labels, values, opts) {
    opts = opts || {};
    var fmt = opts.format || ADM.money;
    var W = 720, H = 260, pl = 50, pb = 30, pt = 22, n = values.length;
    var max = Math.max.apply(null, values.concat([1])); var step = Math.pow(10, Math.floor(Math.log10(max))); var top = Math.ceil(max / step) * step;
    var bw = (W - pl - 10) / n, s = '';
    for (var g = 0; g <= 4; g++) { var gy = pt + (H - pt - pb) * (1 - g / 4); s += '<line class="adm-chart-grid" x1="' + pl + '" x2="' + W + '" y1="' + gy + '" y2="' + gy + '"/><text x="' + (pl - 6) + '" y="' + (gy + 4) + '" text-anchor="end">' + ADM.esc(opts.axis ? opts.axis(top * g / 4) : Math.round(top * g / 4).toLocaleString('en-GB')) + '</text>'; }
    values.forEach(function (v, i) {
      var h = (H - pt - pb) * v / top, x = pl + i * bw + bw * .18, y = H - pb - h;
      s += '<rect class="' + (opts.highlight === i ? 'adm-bar-alt' : 'adm-bar') + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (bw * .64).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3"><title>' + ADM.esc(labels[i] + ': ' + fmt(v)) + '</title></rect>';
      s += '<text x="' + (x + bw * .32).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle">' + ADM.esc(labels[i]) + '</text>';
    });
    el.innerHTML = '<svg class="adm-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + ADM.esc(opts.label || 'Bar chart') + '">' + s + '</svg>';
  };

  /* Horizontal bars: rows [{label, value}] */
  ADM.hbars = function (el, rows, fmt) {
    fmt = fmt || ADM.money;
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }).concat([1]));
    el.innerHTML = rows.map(function (r) { return '<div class="adm-hbar"><span>' + ADM.esc(r.label) + '</span><span class="adm-hbar-track"><span class="adm-hbar-fill" style="width:' + (r.value / max * 100).toFixed(1) + '%"></span></span><b>' + fmt(r.value) + '</b></div>'; }).join('');
  };

  /* ---------- shared catalogue manager with Add / edit / remove ----------
     ADM.catalog(container, groups, { addLabel:'Add hire option', itemNoun:'hire option' })
     groups: [{group, items:[{id,name,price,hours,note}]}] */
  ADM.catalog = function (root, groups, opts) {
    opts = opts || {};
    var noun = opts.itemNoun || 'item';
    var original = JSON.parse(JSON.stringify(groups));
    var data = JSON.parse(JSON.stringify(groups));
    var uid = 0;
    root.innerHTML =
      '<div class="adm-actions" style="margin-bottom:16px"><button type="button" class="adm-btn" data-adm-add aria-expanded="false">' + ADM.icon('plus') + ADM.esc(opts.addLabel || 'Add') + '</button>' +
      '<button type="button" class="adm-btn adm-btn-ghost" data-adm-save>Save changes</button><button type="button" class="adm-btn adm-btn-ghost" data-adm-reset>Reset</button></div>' +
      '<form class="adm-panel" data-adm-panel hidden novalidate><h2 class="adm-h2" data-adm-panel-title></h2>' +
      '<div class="adm-form-row"><div class="adm-field"><label for="adm-f-name">Name</label><input class="adm-input" id="adm-f-name" required></div>' +
      '<div class="adm-field"><label for="adm-f-group">Group</label><select class="adm-select" id="adm-f-group" required></select></div></div>' +
      '<div class="adm-form-row"><div class="adm-field"><label for="adm-f-price">Price (£)</label><input class="adm-input" id="adm-f-price" type="number" min="1" step="1" inputmode="decimal" required></div>' +
      '<div class="adm-field"><label for="adm-f-hours">Hire length (hours, 0 for add-ons)</label><input class="adm-input" id="adm-f-hours" type="number" min="0" max="12" step="1" value="0"></div></div>' +
      '<div class="adm-field"><label for="adm-f-note">Description</label><input class="adm-input" id="adm-f-note"></div>' +
      '<p class="adm-field-error" data-adm-err hidden></p>' +
      '<div class="adm-panel-actions"><button type="submit" class="adm-btn">Save ' + ADM.esc(noun) + '</button><button type="button" class="adm-btn adm-btn-ghost" data-adm-cancel>Cancel</button></div></form>' +
      '<div data-adm-list></div><p class="adm-status" role="status" aria-live="polite" data-adm-status></p>';
    var list = root.querySelector('[data-adm-list]'), panel = root.querySelector('[data-adm-panel]'), err = root.querySelector('[data-adm-err]');
    var f = { name: root.querySelector('#adm-f-name'), group: root.querySelector('#adm-f-group'), price: root.querySelector('#adm-f-price'), hours: root.querySelector('#adm-f-hours'), note: root.querySelector('#adm-f-note') };
    var status = root.querySelector('[data-adm-status]'), addBtn = root.querySelector('[data-adm-add]');
    var editing = null;
    function say(m) { status.textContent = m; ADM.toast(m); }
    function render() {
      f.group.innerHTML = data.map(function (g) { return '<option>' + ADM.esc(g.group) + '</option>'; }).join('');
      list.innerHTML = data.map(function (g, gi) {
        return '<section class="adm-card adm-group"><div class="adm-group-head"><h2 class="adm-h2" style="margin:0">' + ADM.esc(g.group) + '</h2><span class="adm-muted">' + g.items.length + ' ' + (g.items.length === 1 ? 'option' : 'options') + '</span></div>' +
          '<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th scope="col">Option</th><th scope="col">Hours</th><th scope="col">Description</th><th scope="col">Website price</th><th scope="col"><span class="adm-sr">Actions</span></th></tr></thead><tbody>' +
          g.items.map(function (it, ii) {
            var orig = findOrig(it.id); var changed = orig && orig.price !== it.price;
            return '<tr><td>' + ADM.esc(it.name) + '</td><td>' + (it.hours ? it.hours : '-') + '</td><td class="adm-muted">' + ADM.esc(it.note || '') + '</td>' +
              '<td><span class="adm-price-input' + (changed ? ' adm-price-changed' : '') + '"><span aria-hidden="true">£</span><input class="adm-input" type="number" min="0" step="1" value="' + it.price + '" data-g="' + gi + '" data-i="' + ii + '" aria-label="Price for ' + ADM.esc(g.group + ' ' + it.name) + '"></span></td>' +
              '<td style="white-space:nowrap"><button type="button" class="adm-icon-btn" data-edit="' + gi + ',' + ii + '" aria-label="Edit ' + ADM.esc(it.name) + '">' + ADM.icon('edit') + '</button> <button type="button" class="adm-icon-btn" data-del="' + gi + ',' + ii + '" aria-label="Remove ' + ADM.esc(it.name) + '">' + ADM.icon('trash') + '</button></td></tr>';
          }).join('') + '</tbody></table></div></section>';
      }).join('');
    }
    function findOrig(id) { for (var a = 0; a < original.length; a++) for (var b = 0; b < original[a].items.length; b++) if (original[a].items[b].id === id) return original[a].items[b]; return null; }
    function openPanel(gi, ii) {
      editing = gi == null ? null : [gi, ii];
      root.querySelector('[data-adm-panel-title]').textContent = editing ? 'Edit ' + noun : (opts.addLabel || 'Add');
      var it = editing ? data[gi].items[ii] : { name: '', price: '', hours: 0, note: '' };
      f.name.value = it.name; f.price.value = it.price; f.hours.value = it.hours || 0; f.note.value = it.note || '';
      f.group.value = editing ? data[gi].group : data[0].group;
      err.hidden = true; [f.name, f.price].forEach(function (x) { x.removeAttribute('aria-invalid'); });
      panel.hidden = false; addBtn.setAttribute('aria-expanded', 'true'); f.name.focus();
    }
    function closePanel() { panel.hidden = true; addBtn.setAttribute('aria-expanded', 'false'); editing = null; }
    addBtn.addEventListener('click', function () { if (panel.hidden || editing) openPanel(); else closePanel(); });
    root.querySelector('[data-adm-cancel]').addEventListener('click', closePanel);
    panel.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = f.name.value.trim(), price = parseFloat(f.price.value), bad = [];
      f.name.setAttribute('aria-invalid', name ? 'false' : 'true'); if (!name) bad.push('a name');
      var okP = !isNaN(price) && price > 0; f.price.setAttribute('aria-invalid', okP ? 'false' : 'true'); if (!okP) bad.push('a price above £0');
      if (bad.length) { err.textContent = 'Please enter ' + bad.join(' and ') + '.'; err.hidden = false; (name ? f.price : f.name).focus(); return; }
      var item = { id: editing ? data[editing[0]].items[editing[1]].id : 'new-' + (++uid), name: name, price: Math.round(price * 100) / 100, hours: parseInt(f.hours.value, 10) || 0, note: f.note.value.trim() };
      var gi = data.map(function (g) { return g.group; }).indexOf(f.group.value);
      if (editing) { data[editing[0]].items.splice(editing[1], 1); }
      data[gi].items.push(item);
      data[gi].items.sort(function (a, b) { return (a.hours || 99) - (b.hours || 99); });
      var was = !!editing; closePanel(); render();
      say((was ? 'Updated ' : 'Added ') + name + ' to ' + data[gi].group + '.');
    });
    list.addEventListener('input', function (e) {
      var t = e.target; if (t.dataset.g == null) return;
      var it = data[+t.dataset.g].items[+t.dataset.i]; it.price = parseFloat(t.value) || 0;
      var o = findOrig(it.id); t.parentNode.classList.toggle('adm-price-changed', !o || o.price !== it.price);
    });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.edit) { var p = b.dataset.edit.split(','); openPanel(+p[0], +p[1]); }
      if (b.dataset.del) { var q = b.dataset.del.split(','); var nm = data[+q[0]].items[+q[1]].name; data[+q[0]].items.splice(+q[1], 1); render(); say('Removed ' + nm + ' from ' + data[+q[0]].group + '.'); }
    });
    root.querySelector('[data-adm-save]').addEventListener('click', function () {
      original = JSON.parse(JSON.stringify(data)); render();
      var d = new Date(); say('Price changes saved at ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + '.');
    });
    root.querySelector('[data-adm-reset]').addEventListener('click', function () { data = JSON.parse(JSON.stringify(original)); closePanel(); render(); say('Prices reset to the last saved values.'); });
    render();
    return { data: function () { return data; } };
  };

  window.ADM = ADM;
  document.addEventListener('DOMContentLoaded', function () { ADM.renderNav(); });
})();
