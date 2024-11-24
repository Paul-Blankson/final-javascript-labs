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
        console.log("Whoops, can't be empty…");
        return;
    }

    try {
        // Show loading state later
        searchInput.classList.remove('error');
        errorMessage.style.display = 'none';
        
        // Fetch word data
        const response = await fetch(`${API_URL}${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Word not found');
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error);
    }
});

function displayWordData(wordData) {
    document.querySelector('.word__title').textContent = wordData.word;
    document.querySelector('.word__phonetic').textContent = wordData.phonetic || '';
}