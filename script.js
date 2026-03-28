/* ─────────────────────────────────────────
   Sirana Yugesh Royal — Portfolio JS
   script.js
───────────────────────────────────────── */

/* ── 0. EmailJS initialisation ──
   Steps to activate (one-time, free):
   1. Go to https://www.emailjs.com and sign up (free)
   2. Add Email Service → connect your Gmail (yugeshroyal321@gmail.com)
      → copy the  Service ID  (looks like "service_xxxxxxx")
   3. Create Email Template → use these variables in the template body:
        From:    {{from_name}}  <{{reply_to}}>
        Message: {{message}}
      → copy the  Template ID  (looks like "template_xxxxxxx")
   4. Go to Account → API Keys → copy your  Public Key
   5. Replace the three placeholder strings below with your real IDs
─────────────────────────────────────────── */
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';      // ← paste here
var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';      // ← paste here
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';     // ← paste here

(function () {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();


/* ── 1. Typing animation ── */
var phrases = ['AI Student', 'Python Developer', 'ML Enthusiast', 'Problem Solver'];
var phraseIndex = 0;
var charIndex   = 0;
var isDeleting  = false;
var typedEl     = document.getElementById('typed');

function runTyping() {
  var currentWord = phrases[phraseIndex];

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

  setTimeout(runTyping, isDeleting ? 55 : 95);
}

setTimeout(runTyping, 600);


/* ── 2. Scroll reveal ── */
var revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal, .reveal-group').forEach(function (el) {
  revealObserver.observe(el);
});


/* ── 3. Sticky navbar shadow ── */
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});


/* ── 4. Mobile hamburger menu ── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('navLinks').classList.remove('open');
    resetBurger();
  });
});

document.addEventListener('click', function (e) {
  var navbar = document.getElementById('navbar');
  if (!navbar.contains(e.target)) {
    document.getElementById('navLinks').classList.remove('open');
    resetBurger();
  }
});

function resetBurger() {
  var spans = document.querySelectorAll('#burger span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
}

document.getElementById('burger').addEventListener('click', function () {
  var spans = this.querySelectorAll('span');
  var isOpen = document.getElementById('navLinks').classList.contains('open');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    resetBurger();
  }
});


/* ── 5. Contact form → EmailJS → your Gmail ── */
function handleForm(e) {
  e.preventDefault();

  var btn        = document.getElementById('submitBtn');
  var statusEl   = document.getElementById('formStatus');
  var form       = document.getElementById('contactForm');

  /* Loading state */
  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled   = true;
  statusEl.style.display = 'none';

  var templateParams = {
    from_name : document.getElementById('from_name').value.trim(),
    reply_to  : document.getElementById('reply_to').value.trim(),
    message   : document.getElementById('message').value.trim(),
    to_name   : 'Yugesh'
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function () {
      /* Success */
      btn.innerHTML        = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = '#16a34a';
      statusEl.textContent = '✅ Message delivered to yugeshroyal321@gmail.com';
      statusEl.style.color = '#16a34a';
      statusEl.style.display = 'block';
      form.reset();

      setTimeout(function () {
        btn.innerHTML        = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled         = false;
        statusEl.style.display = 'none';
      }, 4000);
    })
    .catch(function (error) {
      /* Error */
      btn.innerHTML        = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      btn.disabled         = false;
      statusEl.textContent = '❌ Failed to send. Please email directly: yugeshroyal321@gmail.com';
      statusEl.style.color = '#dc2626';
      statusEl.style.display = 'block';
      console.error('EmailJS error:', error);
    });
}


/* ── 6. Smooth scroll (anchor links) ── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var navHeight  = document.getElementById('navbar').offsetHeight;
      var targetTop  = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

