// Attivazione animazioni al caricamento e allo scorrimento
function animateSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section-animate, .slide-in-left, .slide-in-right').forEach((section) => {
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Avvia l'osservatore per le animazioni
  animateSections();

  // Gestione Menu Hamburger
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
  }

  // Bottone torna in cima
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Gestione invio modulo di contatto (se presente)
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form && formMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      formMessage.textContent = "Invio in corso...";
      formMessage.style.color = "#6f4e37";

      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          formMessage.textContent = "Messaggio inviato! Ti ricontatterò al più presto.";
          formMessage.style.color = "#2e7d32";
          form.reset();
        } else {
          formMessage.textContent = "Errore nell'invio. Riprova più tardi.";
          formMessage.style.color = "#b85c38";
        }
      }).catch(() => {
        formMessage.textContent = "Impossibile inviare, controlla la tua connessione.";
        formMessage.style.color = "#b85c38";
      });
    });
  }
});
