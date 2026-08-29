import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const app = document.querySelector("#app");

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        let media;

        if (data.media_type === "image") {
            media = `<img src="${data.url}">`;
        } else if (data.url.includes("youtube")) {
            media = `<iframe src="${data.url}"></iframe>`;
        } else {
            media = `<video src="${data.url}" controls></video>`;
        }

        app.innerHTML = `
            <h1>${data.title}</h1>
            ${media}
            <p>${data.explanation}</p>
        `;
    })
    .catch(err => {
        app.innerHTML = `<p>Error: ${err.message}</p>`;
    });

// Search bar
const search = document.querySelector("#search");

search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = search.value;
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

// Clock and date
const clock = document.querySelector("#clock");

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

    const date = now.toLocaleDateString([], {
        month: "2-digit",
        day: "2-digit"
    });

    clock.textContent = `${time} • ${date}`;
}

updateClock();
setInterval(updateClock, 1000);