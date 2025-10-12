const button = document.getElementById('FunButton');

button.addEventListener('mouseover', () => {
    const x = Math.random() * 600 - 300;
    const y = Math.random() * 400 - 200;
    button.style.transform = `translate(${x}px, ${y}px)`;
});