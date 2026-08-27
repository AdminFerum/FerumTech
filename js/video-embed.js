document.querySelectorAll('.video-embed[data-platform="youtube"]').forEach(el => {
    const url = el.dataset.url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);

    if (match) {
        const id = match[1];
        el.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${id}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen 
                loading="lazy">
            </iframe>`;
    }
});