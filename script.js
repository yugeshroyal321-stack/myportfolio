/* ─────────────────────────────────────────
   Sirana Yugesh Royal — Portfolio JS Engine
   script.js
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Dark / Light Theme Handler ── */
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const currentTheme = localStorage.getItem('theme') || 'light';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
      themeIcon.style.color = '#fde047';
    } else {
      themeIcon.className = 'fas fa-moon';
      themeIcon.style.color = '';
    }
  }

  // Initialize theme
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }


  /* ── 2. Typing Animation ── */
  const phrases = [
    'AI & ML Engineer',
    'Cybersecurity + AI Specialist',
    'Python & NLP Developer',
    'Problem Solver'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typed');

  function runTyping() {
    if (!typedEl) return;
    const currentWord = phrases[phraseIndex];

    if (!isDeleting) {
      typedEl.textContent = currentWord.slice(0, ++charIndex);
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(runTyping, 1800);
        return;
      }
    } else {
      typedEl.textContent = currentWord.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(runTyping, isDeleting ? 50 : 90);
  }

  setTimeout(runTyping, 600);


  /* ── 3. Scroll Reveal (Intersection Observer) ── */
  const revealElements = document.querySelectorAll('.reveal, .reveal-group');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('visible'));
  }


  /* ── 4. Sticky Navbar & Active Navigation Highlight ── */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Shadow on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Highlight
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });


  /* ── 5. Mobile Navigation & Hamburger Sync ── */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('open');
    if (burger) burger.classList.remove('is-active');
  }

  function toggleMenu() {
    if (!navLinks || !burger) return;
    const isOpen = navLinks.classList.toggle('open');
    if (isOpen) {
      burger.classList.add('is-active');
    } else {
      burger.classList.remove('is-active');
    }
  }

  if (burger) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu on clicking nav link
  navLinkItems.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
      closeMenu();
    }
  });


  /* ── 6. Smooth Scrolling for Links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

});


/* ── 7. Interactive Contact Form Handler ── */
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  if (!btn) return;

  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = '#16a34a';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
}


/* ── 8. Smart Weather App Interactive Demo Modal ── */
function openWeatherModal() {
  const modal = document.getElementById('weatherModal');
  if (modal) modal.classList.add('open');
}

function closeWeatherModal() {
  const modal = document.getElementById('weatherModal');
  if (modal) modal.classList.remove('open');
}

// Close modal on escape key or clicking backdrop
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeWeatherModal();
});

const weatherModal = document.getElementById('weatherModal');
if (weatherModal) {
  weatherModal.addEventListener('click', (e) => {
    if (e.target === weatherModal) closeWeatherModal();
  });
}

// Weather Database Simulation / API Fetcher
const cityWeatherData = {
  chittoor: { temp: '32°C', icon: 'fa-sun', desc: 'Sunny / Clear Sky', humidity: '62%', wind: '12 km/h', pressure: '1012 hPa', name: 'Chittoor, IN' },
  london: { temp: '18°C', icon: 'fa-cloud-rain', desc: 'Light Rain', humidity: '82%', wind: '19 km/h', pressure: '1008 hPa', name: 'London, UK' },
  tokyo: { temp: '24°C', icon: 'fa-cloud-sun', desc: 'Partly Cloudy', humidity: '70%', wind: '14 km/h', pressure: '1015 hPa', name: 'Tokyo, JP' },
  newyork: { temp: '27°C', icon: 'fa-bolt', desc: 'Thunderstorm', humidity: '78%', wind: '22 km/h', pressure: '1005 hPa', name: 'New York, US' },
  sydney: { temp: '21°C', icon: 'fa-wind', desc: 'Breezy & Clear', humidity: '55%', wind: '28 km/h', pressure: '1020 hPa', name: 'Sydney, AU' }
};

function searchWeather() {
  const input = document.getElementById('weatherCity');
  if (!input) return;

  const query = input.value.trim().toLowerCase().replace(/\s+/g, '');
  const data = cityWeatherData[query] || {
    temp: `${Math.floor(22 + Math.random() * 12)}°C`,
    icon: 'fa-cloud-sun',
    desc: 'Partly Sunny',
    humidity: `${Math.floor(50 + Math.random() * 35)}%`,
    wind: `${Math.floor(8 + Math.random() * 18)} km/h`,
    pressure: '1013 hPa',
    name: input.value.trim() ? input.value.trim() : 'Location'
  };

  document.getElementById('weatherTemp').textContent = data.temp;
  document.getElementById('weatherCityName').textContent = data.name;
  document.getElementById('weatherDesc').textContent = data.desc;
  document.getElementById('weatherHumidity').textContent = data.humidity;
  document.getElementById('weatherWind').textContent = data.wind;
  document.getElementById('weatherPressure').textContent = data.pressure;

  const iconEl = document.getElementById('weatherIcon');
  if (iconEl) iconEl.className = `fas ${data.icon}`;
}
