// Need code to check for unnmatched letters
// Need to fix for loop that checks all letters because 2nd keyed up letters aren't coming in defined at all


// Global Variables

var chosen;
var saveWord = [];
var currentWord = [];
var currentWordIndex;
var blanks;
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

hangmanSpace();

function hangmanSpace() {
    // random generator to select word from array:
    currentWordIndex = Math.floor(Math.random() * spaceWords.length);


    // new word and underscores
    for (var i = 0; i < spaceWords[currentWordIndex].length; i++) {
        currentWord[i] = "_ ";
    }

    saveWord = currentWord;

    console.log(currentWord);

    console.log(spaceWords[currentWordIndex]); // prints the word in the console for me to play with rest of code...

    document.getElementById("selectedWord").innerHTML = currentWord.join("");

    chosen = spaceWords[currentWordIndex];
    console.log(chosen);

    document.onkeyup = function(event) {
        
        // for (var i = 0; i < spaceWords[currentWordIndex].length; i++) {
        //     saveWord[i] = "_ ";
        // }
        console.log(saveWord);
        console.log(currentWord);



        // if game finishes --> reset it, else continue to makeGuess function to play game!
        // IF ELSE HERE WORKS. CONFIRMED.
        if(gameEnd) {
            gameEnd = true;
            resetGame();
        } else {
            // Making sure alphabet was input by user
            console.log(spaceWords[currentWordIndex]); // the random word picked displays
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
        }
    
        function makeGuess(letter) {
            if (triesLeftZero > 0) {
                if (!gameStart) {
                    gameStart = true;
                }
    
                // double check for copied letters and pushing letters
                // something broken below...
                if (lettersGuessed.indexOf(letter) === -1) {
                    lettersGuessed.push(letter);
                    console.log(spaceWords[currentWordIndex]); // pluto
                    console.log(lettersGuessed); // ["p"]
                    console.log(letter); // p
                    replaceGuess(letter);
                }
            }
        }; // End makeGuess
    
        // Replacing correct guesses into underscores!
        function replaceGuess(letter) {
            // had to change blanks to an array to push
            var blanks = [];
    
            // searching through all the letters of the words for matches and pushing them if they're correct
            // spaceWords[currentWordIndex] is my word, I need to make the word an array of letters, therefore I can check the array of letters against the keyups
    
            // spaceWords[currentWordIndex[i]] === letter
    
            console.log(chosen);
    
            for (var i = 0; i < chosen.length; i++) {
                if(chosen[i] === letter) {
                    blanks.push(i);
                    console.log(currentWord);
                    saveWord[i] = chosen[i];
    
                    console.log(blanks); // [0] putting the index of the typed letter inside it
                    console.log(letter); // undefined
                    console.log(chosen.length); // 9 working
                    console.log(chosen[i]); // satellite This one is okay when I move my square bracket outside ([currentWordIndex[i]] vs. [currentWordIndex][i]]
                    console.log(currentWord);
                    console.log(saveWord);
                    console.log(saveWord[i]);
                } else {
                    triesLeftZero = triesLeftZero - 1;
                }
            }
            document.getElementById("selectedWord").innerHTML = saveWord.join("");
    
    
            // if the letter doesn't match it takes away a try, or guess from the tracker
            // if (chosen[i] != letter) {
            //     triesLeftZero = triesLeftZero - 1;
            //     document.getElementById("triesLeft").innerHTML = triesLeftZero;
            //     console.log(triesLeftZero);
            // } else {
            //     // if the letter does match it should...hopefully... replace the '_' with the letter.... fingers crossed!
            //     // I had trouble here making sure my array and variables were defined in the right places.
            //     for(var i = 0; i < blanks.length; i++) {
            //         currentWord[blanks[i]] = letter;
            //         console.log(blanks); // this one is working
            //     }
            // }
        }; // End replaceGuess
        makeGuess();
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
        
    }; // End document.onkeyup


}
// END GIANT FUNCTION called hangmanSpace





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

    // I don't remember what these do below (until the end of reset Game)
    // for (var i = 0; i < currentWord.length; i++) {
    //     document.getElementById("selectedWord").innerHTML += currentWord[i];
    //     console.log(currentWord[i]);
    // }
    
    document.getElementById("triesLeft").innerHTML = triesLeftZero;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
    if(triesLeftZero <= 0) {
        gameEnd = true;
    }
};

resetGame();