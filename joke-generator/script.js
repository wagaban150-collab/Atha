// API Endpoints
const JOKE_API_URL = 'https://official-joke-api.appspot.com/jokes';

// DOM Elements
const jokeText = document.getElementById('jokeText');
const jokeType = document.getElementById('jokeType');
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const categorySelect = document.getElementById('categorySelect');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

let currentJoke = '';

// Fetch a random joke
async function fetchJoke() {
    const category = categorySelect.value;
    let url = `${JOKE_API_URL}/random`;

    if (category) {
        url = `${JOKE_API_URL}/${category}/random`;
    }

    try {
        showLoading(true);
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayJoke(data);
    } catch (err) {
        console.error('Error fetching joke:', err);
        showError(`Failed to fetch joke: ${err.message}`);
    } finally {
        showLoading(false);
    }
}

// Display the joke
function displayJoke(jokeData) {
    if (jokeData.type === 'knock-knock') {
        // Knock-knock jokes have setup and delivery
        currentJoke = `${jokeData.setup}\n${jokeData.delivery}`;
        jokeType.textContent = '🎭 Knock-Knock Joke';
    } else {
        // General jokes have setup and punchline
        currentJoke = `${jokeData.setup}\n${jokeData.punchline}`;
        jokeType.textContent = '😄 General Joke';
    }

    jokeText.textContent = currentJoke;
}

// Copy joke to clipboard
function copyJoke() {
    if (!currentJoke) {
        showError('No joke to copy yet!');
        return;
    }

    navigator.clipboard.writeText(currentJoke).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showError('Failed to copy joke to clipboard');
    });
}

// Show loading state
function showLoading(show) {
    if (show) {
        loading.classList.add('show');
        getJokeBtn.disabled = true;
    } else {
        loading.classList.remove('show');
        getJokeBtn.disabled = false;
    }
}

// Show error message
function showError(message) {
    error.textContent = message;
    error.classList.add('show');
}

// Hide error message
function hideError() {
    error.classList.remove('show');
    error.textContent = '';
}

// Event listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);

// Load a joke on page load
window.addEventListener('load', fetchJoke);
