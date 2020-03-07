/* Memory Game Project */
const cardIcons = ["cat", "dog", "dragon", "fish", "truck-monster", "snowplow", "drum", "bus", "bicycle", "space-shuttle", "bolt", "lemon", "frog", "umbrella-beach", "crow", "futbol", "car", "carrot", "paw", "motorcycle", "heart", "spider", "hippo", "star", "football-ball"];
const easy = 16;
const medium = 24;
const hard = 36;

/* maybe don't need this since we are calling game.start()?
var deck = document.querySelectorAll('.card');
deck.forEach(card => card.addEventListener('click', flipCard));
*/


class MemoryGame {
    constructor(deckSize) {
        this.deckSize = deckSize;
        this.deck = getDeck(deckSize);
        this.moveCount = 0;
        // this.cardsFlipped = 0;
        this.card1 = null;
        this.card2 = null;
        this.gameStatus = null;
        this.matchedCards = 0;
        this.winScreen = document.querySelector('#win-screen');
        this.lockBoard = false;
    }

    start() {
        dealGame(this.deck);

    }
    checkForCardMatch() {
        this.moveCount++;
        document.querySelector('#turn-count').innerHTML = this.moveCount;
        console.log(this.card1.getAttribute("data-card") + " matching against " + this.card2.getAttribute("data-card"));
        if (this.card1.getAttribute("data-card") == this.card2.getAttribute("data-card")) {
            //lock cards if they match
            this.card1.removeEventListener('click', flipCard);
            this.card2.removeEventListener('click', flipCard);
            this.matchedCards += 2;
            console.log ("cards match clearing cards");
            this.card1 = null;
            this.card2 = null;
            this.checkForWin();

        } else {
            //flip cards back over
            console.log("flipping cards back over " + this.card1.getAttribute("data-card") +  " and " + this.card2.getAttribute("data-card"));
            
            flipBackCards();
           
       
           

        }
    }


    checkForWin() {
        console.log("checking for win " + this.matchedCards + " matched cards");
        if (this.matchedCards == this.deckSize) {
            this.showWinScreen();
            console.log("WON GAME");
        }
    }

    showWinScreen() {
        // This method displays the end game screen for a Win.
        console.log("showing win screen")
        this.winScreen.setAttribute("class", "show");
        setTimeout(function () {
            game.winScreen.setAttribute("class", "hide");
        }, 4000);
      
    }


}

var game = new MemoryGame(easy);
game.start();




function flipCard() {
    let cardType = this.getAttribute("data-card");
    console.log("flipping card " + cardType);
    this.classList.toggle('flip');

    if (game.card1 == null) {
        game.card1 = this;
        console.log('card1 data is ' + game.card1.getAttribute("data-card"));
    } else {
        game.card2 = this;
        console.log('card2 data is ' + game.card2.getAttribute("data-card"));
        game.checkForCardMatch();

    }
}


//pause briefly before turning cards back over
function flipBackCards() {

    lockBoard = true;
    setTimeout(function () {
        game.card1.classList.remove('flip');
        game.card1 = null;
        lockBoard = false;
    }, 1500);

    setTimeout(function () {
        game.card2.classList.remove('flip');
        game.card2 = null;
  
    }, 1000);
   
}

//Creates an array of memory card icons
function getDeck(deckSize) {
    console.log("getting deck of size" + deckSize);
    var deck = new Array();

    for (let i = 0; i < deckSize / 2; i++) {
        deck.push(cardIcons[i]);
        deck.push(cardIcons[i]);
    }
    return deck;
}

//randomizes the items in a deck array
function shuffleCards(deck) {
    //use Fisher-Yates (aka Knuth) Shuffle
    let currentIndex = deck.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
    }

    console.log("shuffled cards " + deck);
    return deck;

}



// deal all cards in the deck face down
function dealGame(deck) {
    console.log("dealing game");
    //clear game board
    gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    let memoryDeck = shuffleCards(deck);
    //Create flipable memory cards for each card in the deck
    for (let i = 0; i < memoryDeck.length; i++) {

        console.log("created card " + memoryDeck[i]);
        let memoryCard = document.createElement("div");
        memoryCard.setAttribute("class", "card");
        memoryCard.setAttribute("data-card", memoryDeck[i]);

        let cardFront = document.createElement('i');
        cardFront.setAttribute("class", `fas fa-${memoryDeck[i]} card-front`);
        memoryCard.appendChild(cardFront);
        let cardBack = document.createElement('i');
        cardBack.setAttribute("class", `fas fa-question card-back`);
        memoryCard.appendChild(cardBack);
        memoryCard.addEventListener('click', flipCard);
        gameBoard.appendChild(memoryCard);
    }

}


// Outside of the Class definitions, we need a few items to control the game
// so our players can successfully play.

document.addEventListener('DOMContentLoaded', function (event) {

    let startEasyButton = document.querySelector('#start-easy-button');

    // Listens for a "click" event and executes an anonymous function to start the game.
    startEasyButton.addEventListener("click", function (e) {
        console.log("creating new Easy Game")
        game = new MemoryGame(easy);
        game.start();

    });


    let startMediumButton = document.querySelector('#start-medium-button');

    // Listens for a "click" event and executes an anonymous function to start the game.
    startMediumButton.addEventListener("click", function (e) {
        console.log("creating new Medium Game")
        game = new MemoryGame(medium);
        game.start();

    });


    let startHardButton = document.querySelector('#start-hard-button');

    // Listens for a "click" event and executes an anonymous function to start the game.
    startHardButton.addEventListener("click", function (e) {
        console.log("creating new Hard Game")
        game = new MemoryGame(hard);
        game.start();

    });

   
});


// Listen for the "win" event signal andcall the `game.showWinScreen()`
// method to display the winning screen.
document.addEventListener("win", function (event) {
    game.showWinScreen();
    let playAgain = document.querySelector('#winPlayAgain');
    console.log("user pushed play again " + playAgain.getAttribute("class"));
    playAgain.addEventListener("click", function (e) {
        game.winScreen.removeAttribute("class", "show");
        console.log("restarting TicTacToe Game")
        game.start();
    });

});
