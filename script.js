async function translateToPortuguese(text) {
    const apiKey = 'AIzaSyBrzmygeiAIcagi6nu4Ausv0B_LOmlNpgE';
    const sourceLang = 'en';
    const targetLang = 'pt';

    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}&source=${sourceLang}&target=${targetLang}&q=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (data && data.data && data.data.translations && data.data.translations.length > 0) {
            return data.data.translations[0].translatedText;
        }
    } catch (error) {
        console.error('Translation error:', error);
    }

    return 'Translation error';
}

document.getElementById("showModal").addEventListener("click", () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const apiUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${randomNumber}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieData = data.data.movie;
            document.getElementById("movieDuration").textContent = movieData.runtime;
            document.getElementById("movieGenre").textContent = movieData.genres.join(", ");
            document.getElementById("movieRating").textContent = movieData.rating;

            // Traduza a sinopse
            translateToPortuguese(movieData.description_full)
                .then(translatedSynopsis => {
                    // Atualize a sinopse no modal com a tradução
                    document.getElementById("movieSynopsis").textContent = translatedSynopsis;
                })
                .catch(error => console.error(error));

            document.getElementById("movieCover").src = movieData.large_cover_image;
            document.getElementById("movieModalLabel").textContent = movieData.title;

            // Abra o modal
            const modal = new bootstrap.Modal(document.getElementById("movieModal"));
            modal.show();
        })
        .catch(error => console.error(error));

        document.getElementById("showApiInfo").addEventListener("click", () => {
            const apiInfoModal = new bootstrap.Modal(document.getElementById("apiInfoModal"));
            apiInfoModal.show();
        });

        // Evento de clique no botão "Próximo Filme"
document.getElementById("nextMovie").addEventListener("click", function() {
    // Chame uma função para carregar um novo filme da API e atualizar o modal
    // Exemplo:
    // loadNextMovie(); // Esta função deve ser implementada para buscar um novo filme

    // Feche o modal atual
    document.getElementById("movieModal").modal("hide");
});
});