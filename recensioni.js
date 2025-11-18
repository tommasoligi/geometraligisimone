// Funzione per generare le stelle in base alla valutazione
function generateStarRating(rating) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-rating'); // Container per le stelle

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star'); // Classe per ogni stella

        // Se la valutazione è maggiore o uguale al valore della stella, la stella è piena
        if (i <= rating) {
            star.classList.add('full');
        } else {
            star.classList.add('empty');
        }

        star.innerHTML = '&#9733;'; // Il carattere della stella
        starContainer.appendChild(star); // Aggiungi la stella al container
    }

    return starContainer; // Restituisce il container con le stelle
}

// Funzione per caricare le recensioni dal Local Storage
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    savedReviews.forEach(review => {
        const reviewItem = document.createElement('li');
        reviewItem.classList.add('review-item');

        // Crea le stelle per la recensione
        const starRating = generateStarRating(review.rating);

        // Inserisce il nome, la valutazione e il testo della recensione
        reviewItem.innerHTML = `
            <strong>${review.name}</strong><br>
            <div class="review-stars"></div> <!-- Stelle visibili sotto il nome -->
            <p>${review.text}</p>
        `;
        reviewItem.querySelector('.review-stars').appendChild(starRating); // Aggiungi le stelle

        // Aggiungi la recensione alla lista
        reviewsList.appendChild(reviewItem);
    });
}

// Funzione per salvare una nuova recensione nel Local Storage
function saveReview(name, text, rating) {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.push({ name, text, rating });
    localStorage.setItem('reviews', JSON.stringify(savedReviews));
}

// Gestione delle stelle cliccabili
const stars = document.querySelectorAll('.star');
let ratingValue = 0;

// Aggiungiamo un listener per ogni stella
stars.forEach(star => {
    star.addEventListener('click', () => {
        ratingValue = parseInt(star.getAttribute('data-value'));
        updateStars();
    });
});

// Funzione per aggiornare la visualizzazione delle stelle
function updateStars() {
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= ratingValue) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Gestione del form di recensione
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review').value;

    if (ratingValue === 0) {
        alert('Per favore, seleziona una valutazione.');
        return;
    }

    // Salva la recensione nel Local Storage
    saveReview(name, reviewText, ratingValue);

    // Crea l'elemento della recensione
    const reviewItem = document.createElement('li');
    reviewItem.classList.add('review-item');

    // Crea le stelle per la recensione
    const starRating = generateStarRating(ratingValue);

    // Inserisce il nome, la valutazione e il testo della recensione
    reviewItem.innerHTML = `
        <strong>${name}</strong><br>
        <div class="review-stars"></div> <!-- Stelle visibili sotto il nome -->
        <p>${reviewText}</p>
    `;
    reviewItem.querySelector('.review-stars').appendChild(starRating); // Aggiungi le stelle

    // Aggiungi la recensione alla lista
    reviewsList.appendChild(reviewItem);

    // Resetta il form
    reviewForm.reset();
    ratingValue = 0;
    updateStars(); // Reset delle stelle nel form
});

// Carica le recensioni esistenti al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadReviews);
