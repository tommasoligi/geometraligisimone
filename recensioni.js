document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating .star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            updateStars(selectedRating);
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const reviewText = document.getElementById('review').value.trim();

        if (selectedRating === 0) {
            alert('Per favore, seleziona una valutazione.');
            return;
        }
        if (!name || !reviewText) {
            alert('Per favore, compila tutti i campi.');
            return;
        }

        // invia dati al server
        fetch('add_review.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `nome=${encodeURIComponent(name)}&testo=${encodeURIComponent(reviewText)}&stelle=${selectedRating}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Recensione aggiunta con successo!');
                reviewForm.reset();
                selectedRating = 0;
                updateStars(selectedRating);
                // Aggiorna lista recensioni da server (opzionale)
                loadReviews();
            } else {
                alert('Errore: ' + data.message);
            }
        })
        .catch(() => alert('Errore di comunicazione col server.'));
    });

    function loadReviews() {
        fetch('get_reviews.php')
            .then(response => response.json())
            .then(data => {
                reviewsList.innerHTML = '';
                data.forEach(review => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${review.nome}</strong> (${review.stelle} stelle):<br>${review.testo}`;
                    reviewsList.appendChild(li);
                });
            });
    }

    loadReviews();
});
