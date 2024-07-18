const totalCards = 16;
let cards = [];
let selectedCards = [];
let currentMove = 0;
let currentAttempts = 0;
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F'];
const valueUsed = [...cardValues, ...cardValues].sort(() => 0.5 - Math.random());
const animate = (Element, Animation) => {
    return new Promise(resolve => {
        Element.classList.add(animation);
        Element.addEventListener('animationend', () => {
            Element.classList.remove(animation);
            resolve();
        }, { once: true });
    });
}
for (let i = 0; i < totalCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardInner = document.createElement('div');
    cardInner.classList.add('cardInner');
    const face = document.createElement('div');
    face.classList.add('face');
    face.textContent = '?';
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = valueUsed[1];
    cardInner.appendChild(face);
    cardInner.appendChild(back);
    card.appendChild(cardInner);
    game.appendChild(card);
    cards.push(card);
};
async function checkMatch(clickedCard) {
    selectedCards.push(clickedCard);
    if (selectedCards.length === 2) {
        const card1 = selectedCards[0];
        const card2 = selectedCards[1];
        if (card1.querySelector('.back').textContent === card2.querySelector('.back').textContent) {
            selectedCards.length = 0;
            await animate(card1, 'match');
            await animate(card2, 'match');
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            selectedCards.length = 0;
        };
    }
}
currentMove = 0;
currentAttempts++;
localStorage.setItem('attempts', currentAttempts);
console.log(`${currentAttempts} intentos`);
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped') && currentMove < 2) {
            card.classList.add('flipped');
            selectedCards.push(card);
            if (selectedCards.length === 2) {
                checkMatch();
            }
        }
    });
});
(function init() {
    currentAttempts = localStorage.getItem('attempts') || 0;
    console.log(`${currentAttempts} intentos guardados`);
})();