document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    const fontSelect = document.getElementById('fontSelect');
    const fonts = {
        'sans': 'inter, sans-serif',
        'serif': 'lora, serif',
        'mono': 'inconsolata, monospace'
    };

    // Load saved font preference or default to sans
    const savedFont = localStorage.getItem('font') || 'sans';
    document.body.style.fontFamily = fonts[savedFont];
    fontSelect.value = savedFont;

    fontSelect.addEventListener('change', (e) => {
        const selectedFont = e.target.value;
        document.body.style.fontFamily = fonts[selectedFont];
        localStorage.setItem('font', selectedFont);
    });
});

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorMessage = document.getElementById('errorMessage');

// Search form functionality
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        displayError("Whoops, can't be empty…");
        return;
    }

    try {
        // Show loading state later
        
        // Fetch word data
        const response = await fetch(`${API_URL}${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Word not found');
        }

        const data = await response.json();
        displayWordData(data[0]);

    } catch (error) {
        console.error(error);
    }
});

function displayWordData(wordData) {
    document.querySelector('.word__title').textContent = wordData.word;
    document.querySelector('.word__phonetic').textContent = wordData.phonetic || '';

    handleAudio(wordData.phonetics);
    handleMeanings(wordData.meanings);
    handleSource(wordData.sourceUrls);
}

function handleAudio(phonetics) {
    const audioElement = document.querySelector('.word__play-button');
    const audioSource = phonetics.find(phonetic => phonetic.audio)?.audio;
    if (audioSource) {
        audioElement.onclick = () => new Audio(audioSource).play();
        audioElement.style.display = 'block';
    } else {
        audioElement.style.display = 'none';
    }
}

function handleMeanings(meanings) {
    const meaningsContainer = document.getElementById('meanings-container');
    meaningsContainer.innerHTML = '';

    meanings.forEach(meaning => {
        const meaningSection = document.createElement('section');
        meaningSection.classList.add('meaning');
        meaningSection.innerHTML = `
            <h2 class="meaning__part-of-speech">${meaning.partOfSpeech}</h2>
            <p class="meaning__label">Meaning</p>
            <ul class="meaning__list">
                ${meaning.definitions.map(def => `
                    <li class="meaning__item">${def.definition}</li>
                    ${def.example ? `<span class="example__verb">"${def.example}"</span>` : ''}
                `).join('')}
            </ul>
        `;
        meaningsContainer.appendChild(meaningSection);

        handleSynonyms(meaning.synonyms);
    });
}

function handleSynonyms(synonyms) {
    if (synonyms.length > 0) {
        const synonymsSection = document.createElement('section');
        synonymsSection.classList.add('synonyms');
        synonymsSection.innerHTML = `
            <span class="synonyms__label">Synonyms</span>
            <h2 class="synonyms__text">${synonyms.join(', ')}</h2>
        `;
        document.querySelector('.meaning').appendChild(synonymsSection);
    }
}

function handleSource(sourceUrls) {
    footerElement = document.querySelector('.source');
    const sourceElement = document.querySelector('.source__link');
    if (sourceUrls && sourceUrls.length > 0) {
        sourceElement.href = sourceUrls[0];
        sourceElement.textContent = sourceUrls[0];
        footerElement.style.display = 'block';
        sourceElement.style.display = 'inline-flex';
    } else {
        footerElement.style.display = 'none';
        sourceElement.style.display = 'none';
    }
}

function displayError(message) {
    const errorElement = document.createElement('div');
    const inputField = document.querySelector('.search__input');
    const wordSection = document.querySelector('.word');

    if (inputField) {
        inputField.classList.add('search__input-error');
        inputField.style.border = '1.5px solid var(--color-custom-red)';
    }

    errorElement.classList.add('error-message');
    errorElement.textContent = message;

    if (wordSection) {
        wordSection.innerHTML = '';
        wordSection.appendChild(errorElement);
    }
}
