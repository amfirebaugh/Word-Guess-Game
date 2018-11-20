// Global Variables

// var chosen;
var currentWord = [];
var currentWordIndex;
// var blanks;
// var ranNum;
var winCount = 0;
var lettersGuessed = [];
var letterCounter = 0;
var triesLeft = 15;
var triesLeftZero = 0;

var gameStart = false;
var gameEnd = false;

// Word List Array:
var spaceWords = ["comet", "constellation", "meteor", "nebula", "pluto", "satellite", "eclipse", "telescope"];


// BEGIN/RESET THE GAME:

function resetGame() {

    // reset these:
    triesLeftZero = triesLeft;
    gameStart = false;

    // random generator to select word from array:
    currentWordIndex = Math.floor(Math.random() * (spaceWords.length));

    // clear the page:
    lettersGuessed = [];
    currentWord = [];

    // go back to original image: &&&&&&&&&&&&&&&&& DOUBLE CHECK &&&&&&&&&&&&&&
    document.getElementById("tableImg").src = "assets/images/start_game.jpg";

    // new word and underscores
    for (var i = 0; i < spaceWords[currentWordIndex].length; i++) {
        currentWord.push("_");
    }

    // run display function (below)
    updateDisplay();
};

// display function for begin/restart game
function updateDisplay() {

    document.getElementById("winCount").innerhtml = winCount;
    document.getElementById("selectedWord").innerhtml = "";
    for (var i = 0; i < currentWord.length; i++) {
        document.getElementById("selectedWord").innerhtml += currentWord[i];
    }
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Honestly not sure if below should have triesLeftZero or triesLeft....
    document.getElementById("triesLeft").innerhtml = triesLeftZero;
    document.getElementById("lettersGuessed").innerhtml = lettersGuessed;
    if(triesLeftZero <= 0) {
        gameEnd = true;
    }
};

document.onkeyup = function(event) {
    // if game finishes --> reset it
    if(gameEnd) {
        resetGame();
        gameEnd = false;
    } else {
        // Making sure alphabet was input by user
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (triesLeftZero > 0) {
        if (!gameStart) {
            gameStart = true;
        }

        // double check for copied letters and pushing letters
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            replaceGuess(letter);
        }
    }
    
    updateDisplay();
    addWins();
};

// Replacing correct guesses into underscores!
function replaceGuess(letter) {
    // had to change blanks to an array to push
    var blanks = [];

    // searching through all the letters of the words for matches and pushing them if they're correct
    for (var i = 0; i < spaceWords[currentWordIndex].length; i++) {
        if(spaceWords[currentWordIndex][i] === letter) {
            blanks.push(i);
        }
    }

    // if the letter doesn't match it takes away a try, or guess from the tracker
    if (blanks.length <= 0) {
        triesLeftZero --;
    } else {
        // if the letter does match it should...hopefully... replace the '_' with the letter.... fingers crossed!
        // I had trouble here making sure my array and variables were defined in the right places.
        for(var i = 0; i < blanks.length; i++) {
            currentWord[blanks[i]] = letter;
        }
    }
};

function addWins() {
    if(currentWord.indexOf("_") === -1) {
        winCount ++;
        gameEnd = true;
    }
};
