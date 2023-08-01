const cards = document.querySelectorAll('.card, .card2, .card3, .card4, .card5');

// Ustaw początkowy kolor kart
let currentColor = '#ff0000';

// Utwórz zmienne przechowujące referencje do poprzedniej i aktualnej karty
let prevCard = null;
let currentCard = cards[0];
let currentCardIndex = 0;

// Utwórz funkcję, która zmienia kolor karty
function changeCardColor(card, index) {
  // Odśwież referencje do poprzedniej i aktualnej karty
  prevCard = currentCard;
  currentCard = card;
  currentCardIndex = index;
  
  // Odśwież kolor poprzedniej i aktualnej karty
  if (prevCard) {
    prevCard.style.backgroundColor = '';
  }
  currentCard.style.backgroundColor = currentColor;
  
  // Zmień kolor na losowy
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  currentColor = randomColor;
}

// Utwórz zmienną przechowującą czas bezczynności
let idleTime = 0;

// Utwórz funkcję, która aktualizuje czas bezczynności i zmienia kolor karty po upłynięciu pewnego czasu
function checkIdleTime() {
  idleTime += 1000;
  if (idleTime >= 5000) {
    const cardsArray = Array.from(cards);
    
    // Znajdź indeks aktualnej karty i następnej karty
    const currentIndex = cardsArray.indexOf(currentCard);
    const nextIndex = (currentIndex + 1) % cards.length;
    
    // Zmień kolor aktualnej karty i przekaż indeks następnej karty
    changeCardColor(cards[nextIndex], nextIndex);
    
    idleTime = 0;
  }
}

// Utwórz funkcję, która resetuje czas bezczynności
function resetIdleTime() {
  idleTime = 0;
}

// Przypisz funkcję resetującą czas bezczynności do różnych zdarzeń interakcji użytkownika
document.addEventListener('click', resetIdleTime);
document.addEventListener('keydown', resetIdleTime);
document.addEventListener('mousemove', resetIdleTime);

// Użyj funkcji setTimeout() do sprawdzania czasu bezczynności i zmiany koloru karty
function startIdleCheck() {
  setTimeout(() => {
    checkIdleTime();
    startIdleCheck();
  }, 1000);
}

startIdleCheck();