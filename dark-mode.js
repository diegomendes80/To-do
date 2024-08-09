// theme.js
const themeButton = document.querySelector('.cabecalho__theme-button');
const body = document.querySelector('body');
const sections = document.querySelectorAll('section');
const bg_background = document.querySelector('.background-image');

function darkMode(){
    sections.forEach(section => {
        section.style.backgroundColor = "hsl(235, 24%, 19%)";
    });

    body.style.backgroundColor = "hsl(235, 21%, 11%)"; 
    themeButton.setAttribute('src', '../images/icon-sun.svg');

    // Notifica que o tema mudou para "dark"
    document.documentElement.dataset.theme = 'dark';
}

function whiteMode(){
    sections.forEach(section => {
        section.style.backgroundColor = "hsl(0, 0%, 98%)";
    });

    body.style.backgroundColor = "hsl(236, 33%, 92%)"; 
    themeButton.setAttribute('src', '../images/icon-moon.svg');

    // Notifica que o tema mudou para "light"
    document.documentElement.dataset.theme = 'light';
}

themeButton.onclick = () => {
    themeButton.classList.toggle('dark');
    
    if(themeButton.classList.contains('dark')){
        darkMode();
    } else {
        whiteMode();
    }

    verificarTamanhoTela();
}

function verificarTamanhoTela(){
    const isDarkMode = themeButton.classList.contains('dark');
    const screenSize = window.innerWidth <= 350 ? 'mobile' : 'desktop';
    const mode = isDarkMode ? 'dark' : 'light';

    bg_background.setAttribute('src', `../images/bg-${screenSize}-${mode}.jpg`);
}

window.onload = verificarTamanhoTela;
window.addEventListener('resize', verificarTamanhoTela);
