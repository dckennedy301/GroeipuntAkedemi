// Hamburger / mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mark hero elements visible immediately (they're already in view)
document.querySelectorAll('.hero .fade-up').forEach(el => {
  el.classList.add('visible');
});

// Active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Contact form — WhatsApp & Email submission
const contactForm = document.getElementById('contactForm');

function getFormFields() {
  return {
    name:    contactForm.querySelector('[name="naam"]')?.value.trim() || '',
    phone:   contactForm.querySelector('[name="telefoon"]')?.value.trim() || '',
    email:   contactForm.querySelector('[name="epos"]')?.value.trim() || '',
    grade:   contactForm.querySelector('[name="graad"]')?.value || '',
    message: contactForm.querySelector('[name="boodskap"]')?.value.trim() || '',
  };
}

function validateContactForm() {
  for (const field of contactForm.querySelectorAll('[required]')) {
    if (!field.value.trim()) { field.focus(); return false; }
  }
  return true;
}

const submitWhatsApp = document.getElementById('submitWhatsApp');
if (submitWhatsApp && contactForm) {
  submitWhatsApp.addEventListener('click', () => {
    if (!validateContactForm()) return;
    const { name, phone, email, grade, message } = getFormFields();
    const text = [
      `Hallo GroeiPunt Akademie! 👋`,
      ``,
      `*Naam:* ${name}`,
      `*Telefoon:* ${phone}`,
      email ? `*E-pos:* ${email}` : null,
      `*Graad:* ${grade}`,
      ``,
      `*Boodskap:*`,
      message,
    ].filter(line => line !== null).join('\n');
    window.location.href = `https://wa.me/27650831515?text=${encodeURIComponent(text)}`;
  });
}

const submitEmail = document.getElementById('submitEmail');
if (submitEmail && contactForm) {
  submitEmail.addEventListener('click', () => {
    if (!validateContactForm()) return;
    const { name, phone, email, grade, message } = getFormFields();
    const subject = `Navraag van ${name} — ${grade}`;
    const body = [
      `Naam: ${name}`,
      `Telefoon: ${phone}`,
      email ? `E-pos: ${email}` : null,
      `Graad: ${grade}`,
      ``,
      `Boodskap:`,
      message,
    ].filter(line => line !== null).join('\n');
    window.location.href = `mailto:groeipunt25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
