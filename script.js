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

  // Gestione invio modulo di contatto (FormSubmit, endpoint /ajax/)
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form && formMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const messaggio = form.messaggio.value.trim();

      if (!nome || !/^\S+@\S+\.\S+$/.test(email) || !messaggio) {
        formMessage.textContent = "Compila nome, email valida e messaggio.";
        formMessage.style.color = "#b85c38";
        return;
      }

      formMessage.textContent = "Invio in corso...";
      formMessage.style.color = "#6f4e37";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => response.json().then(data => ({ ok: response.ok, data: data })))
        .then(res => {
          if (res.ok && String(res.data.success) !== "false") {
            formMessage.textContent = "Messaggio inviato! Ti ricontatterò al più presto.";
            formMessage.style.color = "#2e7d32";
            form.reset();
          } else {
            formMessage.textContent = "Errore nell'invio. Riprova o scrivi a info@simoneligi.it.";
            formMessage.style.color = "#b85c38";
          }
        })
        .catch(() => {
          formMessage.textContent = "Impossibile inviare, controlla la tua connessione.";
          formMessage.style.color = "#b85c38";
        });
    });
  }
});
