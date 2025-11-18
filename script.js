document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating .star');
    let selectedRating = 0;

    // Gestire il click su una stella
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-value');
            updateStars(selectedRating);
        });
    });

    // Aggiorna il colore delle stelle in base alla valutazione selezionata
    function updateStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Per visualizzare la valutazione selezionata nel form
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const reviewData = {
            name: document.getElementById('name').value,
            review: document.getElementById('review').value,
            rating: selectedRating
        };
        
        // Aggiungere la recensione alla lista
        addReviewToList(reviewData);
        reviewForm.reset(); // Reset form after submission
    });

    // Funzione per aggiungere una recensione alla lista
    function addReviewToList(data) {
        const reviewsList = document.getElementById('reviewsList');
        const reviewItem = document.createElement('li');
        reviewItem.innerHTML = `
            <p><strong>${data.name}</strong> (${data.rating} stelle):</p>
            <p>${data.review}</p>
        `;
        reviewsList.appendChild(reviewItem);
    }
});
