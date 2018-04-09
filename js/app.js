/*
 * UDACITY MEMORY GAME PROJECT 2018
 */

const cards = ["fa-diamond", "fa-diamond", 
              "fa-paper-plane-o", "fa-paper-plane-o", 
              "fa-anchor", "fa-anchor", 
              "fa-bolt", "fa-bolt", 
              "fa-cube", "fa-cube", 
              "fa-leaf", "fa-leaf", 
              "fa-bicycle", "fa-bicycle", 
              "fa-bomb", "fa-bomb"];

 
let shuffledCards = [...shuffle(cards)],
    openCards = [],
    matchedCards = 0,
    starRating = "",
    moves = 0,
    interval,
    second = 1, 
    minute = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
// Known as the Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...S
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


// Create HTMl list items
function newGame() {
  shuffledCards.forEach(function(card) {
    $(".deck").append('<li class="card"><i class=" fa ' + card + '"></i></li>');
  })
}
// Call newGame function
newGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
