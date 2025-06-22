'use strict';
const main = document.querySelector('#main');

const getColors = () => {
    const color = document.querySelector('#color').value.slice(1);
    const colorMode = document.querySelector('#colorMode').value;
    console.log(color);
    console.log(colorMode);

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorMode}`)
        .then((res) => res.json())
        .then((data) => {
            const colors = data.colors;
            console.log(colors);
            setColors(colors);
        });
};

const setColors = (colors) => {
    main.innerHTML = '';
    colors.map((color, idx) => {
        const box = document.createElement('div');
        box.setAttribute('class', 'box');

        const boxColor = document.createElement('div');
        boxColor.setAttribute('class', 'color');
        boxColor.style.backgroundColor = color.hex.value;
        boxColor.dataset.boxColor = color.hex.value;

        const colorCode = document.createElement('p');
        colorCode.setAttribute('class', 'color-code');
        colorCode.textContent = color.hex.value;
        colorCode.dataset.colorCode = color.hex.value;

        main.appendChild(box);
        box.appendChild(boxColor);
        box.appendChild(colorCode);
    });
};

getColors();

document.querySelector('#colorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    getColors();
});

document.addEventListener('click', (e) => {
    if (e.target.dataset.boxColor || e.target.dataset.colorCode) {
        const modalWindow = document.querySelector('#modalWindow');
        modalWindow.style.opacity = 1;
        setTimeout(() => {
            modalWindow.style.opacity = 0;
        }, 2000);
        navigator.clipboard.writeText(e.target.dataset.boxColor);
    }
});
