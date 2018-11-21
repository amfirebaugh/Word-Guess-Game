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
var gameEnd = true;

// Word List Array:
var spaceWords = ["comet", "constellation", "meteor", "nebula", "pluto", "satellite", "eclipse", "telescope"];

hangmanSpace();

function hangmanSpace(){
    // random generator to select word from array:
    currentWordIndex = Math.floor(Math.random() * spaceWords.length);


    // new word and underscores
    for (var i = 0; i < spaceWords[currentWordIndex].length; i++) {
        currentWord[i] = "_ ";
    }

    console.log(spaceWords[currentWordIndex]); // prints the word in the console for me to play with rest of code...

    document.getElementById("selectedWord").innerHTML = currentWord.join("");

    // BEGIN/RESET THE GAME:
    // Reset function appears to be working well
    function resetGame() {

        // reset these:
        triesLeftZero = triesLeft;
        gameStart = true;

        // clear the page:
        lettersGuessed = [];
        currentWord = [];

        document.getElementById("tableImg").src = "assets/images/start_game.jpg";
        document.getElementById("winCount").innerHTML = winCount;

        for (var i = 0; i < currentWord.length; i++) {
            document.getElementById("selectedWord").innerHTML += currentWord[i];
        }
        
        document.getElementById("triesLeft").innerHTML = triesLeftZero;
        document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
        if(triesLeftZero <= 0) {
            gameEnd = true;
        }
    };
    resetGame();


    document.onkeyup = function(event) {
        
        // if game finishes --> reset it, else continue to makeGuess function to play game!
        if(gameEnd) {
            resetGame();
            gameEnd = true;
        } else {
            // Making sure alphabet was input by user
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
        }
        resetGame(); 

        function makeGuess(letter) {
            if (triesLeftZero > 0) {
                // if (!gameStart) {
                //     gameStart = true;
                // }

                // double check for copied letters and pushing letters
                if (lettersGuessed.indexOf(letter) === -1) {
                    lettersGuessed.push(letter);
                    replaceGuess(letter);
                }
            }
        }; // End makeGuess
    
        // Replacing correct guesses into underscores!
        function replaceGuess(letter) {
            // had to change blanks to an array to push
            var blanks = [];
    
            // searching through all the letters of the words for matches and pushing them if they're correct
            for (var i = 0; i < spaceWords[currentWordIndex].length; i++) {
                if(spaceWords[currentWordIndex[i]] === letter) {
                    blanks.push(i);
                    console.log(blanks);
                    console.log(spaceWords[currentWordIndex]); // This one is okay when I move my square bracket outside ([currentWordIndex[i]] vs. [currentWordIndex][i])
                    console.log(spaceWords[currentWordIndex[i]]); // This one is still undefined though....I think it has to do with "letter" being passed into my function, I just don't know how to fix it
                }
            }

    
            // if the letter doesn't match it takes away a try, or guess from the tracker
            if (blanks.length <= 0) {
                triesLeftZero = triesLeftZero - 1;
            } else {
                // if the letter does match it should...hopefully... replace the '_' with the letter.... fingers crossed!
                // I had trouble here making sure my array and variables were defined in the right places.
                for(var i = 0; i < blanks.length; i++) {
                    currentWord[blanks[i]] = letter;
                    console.log(blanks);
                }
            }
        }; // End replaceGuess
        replaceGuess();
    
        // Below I want to add the images that match the words so they'll appear once the word is correctly guessed, but that's not a priority at the moment...

        // I'm not sure why my winCount is incrementing by 2 everytime any key is entered.... this function should make sure that the currentWord index _ is nowhere to be found and THEN increment it by 1 and then set gameEnd to true.
        function addWins() {
            if(currentWord.indexOf("_") === -1) {
                winCount = winCount + 1;
                gameEnd = true;
            }
        }; // End addWins
        addWins();
        makeGuess();
        
        addWins();
    }; // End document.onkeyup

}
// END GIANT FUNCTION called hangmanSpace
