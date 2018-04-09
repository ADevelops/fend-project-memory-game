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


// Game timer
function startTimer(){
  interval = setInterval(function(){
    document.querySelector(".timer").innerHTML = minute + "  mins  " + second + "   secs";
    second++;
    if(second == 60) {
      minute++;
      second = 0;
    }
    if(minute == 60) {
      hour++;
      minute = 0;
    }
  },1000);
};


// Card click event
function clickCard() {

  $(".card").click(function() {

    // Open/show card and disable its click event
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disable");
    openCards.push($(this));

    // Check there is two elements in the openCards array
    if (openCards.length === 2) {

      // Increment moves
      moves += 1;
      document.querySelector(".moves").innerHTML = moves;

        // Start timer
        if (moves === 1){
          startTimer();
        }

        //  Stop timer and call modal if all cards have been matched
        setTimeout(function() {
          if (matchedCards == 8) {
              clearInterval(interval);
              generateModal();
          }
        }, 600);

      // Compare two open cards
      if(openCards[0].children().attr('class') === openCards[1].children().attr('class')) {
        // If cards match
        openCards[0].addClass('match');
        openCards[1].addClass('match');

        // Store matched cards count
        matchedCards += 1;

        //Remove cards from openCards array
        openCards = [];

      } else {
        // If cards don't match
        setTimeout(function() {
          openCards[0].addClass('noMatch');
          openCards[1].addClass('noMatch');
        }, 500);

        // Reset non matching cards
        setTimeout(function() {
          $(".card").removeClass("open");
          $(".card").removeClass("show");
          $(".card").removeClass("disable");
          $(".card").removeClass("noMatch");

          //Remove cards from openCards array
          openCards = [];
        }, 1400)

        // Disable card click temporarily while comparing cards that don't match
        $(".card").addClass("disable");
      }
    }
    // Star rating
    starRating = "Gold";
    if (moves == 16) {
      document.getElementsByClassName("fa-star")[2].remove();
      starRating = "Silver";
    } else if (moves == 24) {
      document.getElementsByClassName("fa-star")[1].remove();
      starRating = "Bronze";
    }
  })
};
// Call function
clickCard();


//Modal code from https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
let modal = document.getElementsByClassName('modal')[0];

// Get the element that closes the modal
let close = document.getElementsByClassName("close")[0];

// When the user clicks close element on the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Modal function
function generateModal() {

let timer   = document.querySelector(".timer");
let endTime = timer.innerHTML;

    // Display modal
    modal.style.display = "block"; 

    // Display in the modal the total amount of moves
    document.querySelector(".totalMoves").innerHTML = moves;

    // Display in the modal the total time taken
    document.querySelector(".totalTime").innerHTML = endTime;

    // Display in the modal the end star rating gold/silver/bronze
    document.querySelector(".starRating").innerHTML = starRating;

    // Replay button in the modal footer
    $(".btn").click(function() {
      location.reload()
    });
};


// Function to restart the game on icon click
function restartGame() {
  $(".restart").click(function() {
    location.reload()
  });
}
//Call function
restartGame();