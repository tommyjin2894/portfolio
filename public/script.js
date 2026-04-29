// ========== Theme: default dark (toggle persists in localStorage) ==========
var themeBtn = document.getElementById('themeToggle');

function getAutoTheme() {
  return 'dark';
}

function applyTheme(theme) {
  document.body.classList.add('theme-t');
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  setTimeout(function () { document.body.classList.remove('theme-t'); }, 500);
}

applyTheme(localStorage.getItem('theme') || getAutoTheme());

themeBtn.addEventListener('click', function () {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ========== Navigation scroll effect ==========
window.addEventListener('scroll', function () {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ========== Mobile nav toggle ==========
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// ========== Reveal on scroll ==========
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

// ========== Counter animation (for data-count elements) ==========
var counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var el = entry.target;
      var target = parseInt(el.dataset.count);
      var duration = 1200;
      var startTime = performance.now();

      function update(now) {
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-count]').forEach(function (el) {
  counterObserver.observe(el);
});

// ========== Project filter ==========
var filterBtns = document.querySelectorAll('.filter-btn');
var projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var filter = btn.dataset.filter;

    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    projectCards.forEach(function (card) {
      var categories = (card.dataset.category || '').split(/\s+/);
      if (filter === 'all' || categories.indexOf(filter) !== -1) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ========== Smooth scroll for anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
