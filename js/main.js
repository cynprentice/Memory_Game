/* Memory Game Project */

/*Goals
Write standards-compliant JS that functions.
Make use of both Array and Object data structures.
Make use of at least TWO conditional statements that play a significant role in your code.
Make use of either Functions or Classes to organize your code.
Make use of at least TWO Event listeners and handlers to respond to user interaction.
Perform at least TWO string modifications/replacements on the page.
Leverage proper DOM traversal and understanding of hierarchy to facilitate manipulating the page to enhance the user's experience.
*/

/*WATS3020: Look it's an array! */
const cardIcons = ["cat", "dog", "dragon", "fish", "truck-monster", "snowplow", "drum", "bus", "bicycle", "space-shuttle", "bolt", "lemon", "frog", "umbrella-beach", "crow", "futbol", "car", "carrot", "paw", "motorcycle", "heart", "spider", "hippo", "star", "football-ball"];
const easy = 16;
const hard = 36;



/*WATS3020: Look it's an object! */
class MemoryGame {
    constructor(deckSize) {
        this.deckSize = deckSize;
        this.deck = getDeck(deckSize);
        this.moveCount = 0;
        this.card1 = null;
        this.card2 = null;
        this.gameStatus = null;
        this.matchedCards = 0;
        this.winScreen = document.querySelector('#win-screen');
        this.lockBoard = false;
        this.gameLength = 0;
    }

    start() {
        dealGame(this.deck);

    }
    checkForCardMatch() {
        this.moveCount++;
        /* WATS3020: Look at the string manipulation! */
        document.querySelector('#turn-count').innerHTML = this.moveCount;
        console.log(this.card1.getAttribute("data-card") + " matching against " + this.card2.getAttribute("data-card"));
        /* WATS3020: Look it's a conditional statement! */
        if (this.card1.getAttribute("data-card") == this.card2.getAttribute("data-card")) {
            //lock cards if they match
            this.card1.removeEventListener('click', flipCard);
            this.card2.removeEventListener('click', flipCard);
            this.matchedCards += 2;
            console.log("cards match clearing cards");
            this.card1 = null;
            this.card2 = null;
            this.checkForWin();

        } else {
            //flip cards back over
            console.log("flipping cards back over " + this.card1.getAttribute("data-card") + " and " + this.card2.getAttribute("data-card"));

            flipBackCards();




        }
    }


    checkForWin() {
        console.log("checking for win " + this.matchedCards + " matched cards");
        if (this.matchedCards == this.deckSize) {
            /* WATS3020: Look at the string manipulation! */
            document.querySelector('#final-turn-count').innerHTML = game.moveCount;
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


/* WATS3020: Look at all the functions below! */

function flipCard() {
    if (game.lockBoard) {
        return;
    }
    game.lockboard = true;
    let cardType = this.getAttribute("data-card");
    console.log("flipping card " + cardType);
    this.classList.toggle('flip');

    /* WATS3020: Look it's a conditional statement! */
    if (game.card1 == null) {
        game.card1 = this;
        game.card1.removeEventListener('click', flipCard);
        console.log('card1 data is ' + game.card1.getAttribute("data-card"));
    } else {
        game.card2 = this;
        game.card2.removeEventListener('click', flipCard);
        console.log('card2 data is ' + game.card2.getAttribute("data-card"));
        game.checkForCardMatch();

    }
    game.lockboard = false;
}


//pause briefly before turning cards back over
function flipBackCards() {
    game.lockBoard = true;
    setTimeout(function () {
        game.card1.classList.remove('flip');
        game.card1.addEventListener('click', flipCard);
        game.card1 = null;
        game.lockBoard = false;
    }, 1500);

    setTimeout(function () {
        game.card2.classList.remove('flip');
        game.card2.addEventListener('click', flipCard);
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


/* WATS3020: Look at all the DOM traversal in this function! */
// deal all cards in the deck face down
function dealGame(deck) {
    console.log("dealing game");
    //clear game board
    game.moveCount=0;
    document.querySelector('#turn-count').innerHTML = game.moveCount;
    gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    let memoryDeck = shuffleCards(deck);
    let numRowsCols = Math.sqrt(game.deckSize);
    let cardCount = 0;
let columnSpan = 12/numRowsCols;
console.log ("dealing game with " + game.deckSize + " card deck. " + numRowsCols + "square board");
    for (let i = 0; i < numRowsCols; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row");
        for (let j = 0; j < numRowsCols; j++) {
            let column = document.createElement("div");
            column.setAttribute("class", `col-${columnSpan}`);

            let memoryCard = document.createElement("div");
            memoryCard.setAttribute("class", "card");
            memoryCard.setAttribute("data-card", memoryDeck[cardCount]);

            let cardFront = document.createElement('i');
            cardFront.setAttribute("class", `fas fa-${memoryDeck[cardCount]} card-front`);
            memoryCard.appendChild(cardFront);
            let cardBack = document.createElement('i');
            cardBack.setAttribute("class", `fas fa-question card-back`);
            memoryCard.appendChild(cardBack);
            memoryCard.addEventListener('click', flipCard);
            column.appendChild(memoryCard);
            row.appendChild(column);
            cardCount+=1;
        }
        gameBoard.appendChild(row);
         }

}

    //Create flipable memory cards for each card in the deck
    /*
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
    */




/* WATS3020: Look it's an event listener! */

document.addEventListener('DOMContentLoaded', function (event) {

    let startEasyButton = document.querySelector('#start-easy-button');

    // Listens for a "click" event and executes an anonymous function to start the game.
    startEasyButton.addEventListener("click", function (e) {
        console.log("creating new Easy Game")
        game = new MemoryGame(easy);
        game.start();

    });




    let startHardButton = document.querySelector('#start-hard-button');



    /* WATS3020: Look it's an event listener! */
    // Listens for a "click" event and executes an anonymous function to start the game.
    startHardButton.addEventListener("click", function (e) {
        console.log("creating new Hard Game")
        game = new MemoryGame(hard);
        game.start();

    });


});


