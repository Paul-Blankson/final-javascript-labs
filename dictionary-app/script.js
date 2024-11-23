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