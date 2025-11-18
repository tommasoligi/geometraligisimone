document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    let ratingValue = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            ratingValue = parseInt(star.getAttribute('data-value'));
            updateStars();
        });
    });

    function updateStars() {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= ratingValue) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const reviewText = document.getElementById('review').value.trim();

        if (ratingValue === 0) {
            alert('Per favore, seleziona una valutazione.');
            return;
        }
        if (!name || !reviewText) {
            alert('Per favore, compila tutti i campi.');
            return;
        }

        // Invia i dati al backend PHP
        fetch('add_review.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `nome=${encodeURIComponent(name)}&testo=${encodeURIComponent(reviewText)}&stelle=${ratingValue}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Recensione aggiunta con successo!');
                reviewForm.reset();
                ratingValue = 0;
                updateStars();
                // Puoi anche aggiornare la lista caricando nuove recensioni da server, se vuoi
            } else {
                alert('Errore: ' + data.message);
            }
        })
        .catch(() => alert('Errore di comunicazione con il server.'));

    });

    updateStars();
});
