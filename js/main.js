import { setFontValues } from './helpers/fonts';
import { getRandomTheme, setTheme } from './helpers/helpers';
import { snapdom } from '@zumer/snapdom';
import { getMainElements } from './helpers/elements';

/* ************** Elements ************** */

const {
    bannerImageContainer,
    bannerImage,
    bannerTitle,
    bannerSubtitle,
    toolbox,
    toolboxDecorations,
    toolboxBackground,
} = getMainElements();

/* ************** Theme Switcher (Corrected) ************** */

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        const themeButtons = themeSwitcher.querySelectorAll('.theme-btn');
        const body = document.body;

        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                
                body.classList.remove('light-theme', 'dark-theme');

                if (theme !== 'colorful') {
                    body.classList.add(theme + '-theme');
                }

                themeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }
});

/* ************** Options ************** */

// Init
document.querySelector('.toolbox .size-inputs input#width-input').value = bannerImageContainer.clientWidth;
let titleFontSelect = toolbox.querySelector('.font-selectors-container #title-font-selector');
let subtitleFontSelect = toolbox.querySelector('.font-selectors-container #subtitle-font-selector');
titleFontSelect.value = 'Red Hat Display';
subtitleFontSelect.value = 'Kalam';

// Demo reset after ended
document.querySelector('.how-to-section video.demo').onended = (e) => e.target.currentTime = 0;

/* ************** Header image buttons ************** */

// Download button
document.querySelector('.download-button')
    .addEventListener('click', async () => {
        document.querySelector('.download-button img').src = './images/icons/loading.gif'

        try {
            const el = document.querySelector('#github-header-image');
            await snapdom.download(el, {
                embedFonts: true,
                format: 'png',
                filename: 'github-header-banner',
                scale: 2
            });
            document.querySelector('.download-button img').src = './images/icons/download.svg'
        } catch (error) {
            console.error('Image capture or download failed:', error);
        }
    })

// For local development
document.addEventListener("DOMContentLoaded", (event) => {
    const displayButton = document.querySelector('.display-button');
    const miniatureButton = document.querySelector('.miniature-button');
    const testFontsTab = document.querySelector('.tablinks[data-name="test-fonts-section"]');

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const el = document.querySelector('#github-header-image');
        const container = document.querySelector('.header-image-container')

        if (displayButton) {
            displayButton.style.display = "block";

            displayButton.addEventListener('click', async () => {
                const png = await snapdom.toPng(el, { embedFonts: true });

                const prevImage = container.children[1];
                if (prevImage) container.removeChild(prevImage);

                container.appendChild(png);
                document.querySelector('.toolbox-container .toolbox-tools').style.height = 'calc(100vh - 230px - 3rem - 35px - 1rem - 230px)'
            })
        }
        if (miniatureButton) {
            miniatureButton.style.display = "block";
            console.log('Running on localhost! display appending image option  ...');

            miniatureButton.addEventListener('click', async () => {
                const png = await snapdom.toPng(el, { embedFonts: true, scale: 0.25 });

                const prevImage = container.children[1];
                if (prevImage) container.removeChild(prevImage);

                container.appendChild(png);
                document.querySelector('.toolbox-container .toolbox-tools').style.height = 'calc(100vh - 230px - 3rem - 35px - 1rem - 46px)'
            })
        }
        if (testFontsTab) {
            // testFontsTab.style.display = "block"
        }
    }
});

/* ************** Randomize ************** */

document.querySelector('.randomize-button')
    .addEventListener('click', (e) => {
        const theme = getRandomTheme();
        setTheme(theme);

    });

/* ************** ************** ************** */