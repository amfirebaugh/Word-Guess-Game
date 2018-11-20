// Global Variables

var randomWord;
// for underscores
var currentWord;
var currentWordIndex;
var blanks;
var ranNum;
var winCount = 0;
var winCountZero = 0;
var triesLeftFresh = 15;
var lettersGuessedFresh;
var letterCorrect;
var letterCounter = 0;

var spaceWords = ["comet", "constellation", "meteor", "nebula", "pluto", "satellite", "eclipse", "telescope"];

const selectedWord = document.getElementById("selectedWord");
const triesLeft = document.getElementById("triesLeft");
const lettersGuessed = document.getElementById("lettersGuessed");

// Maybe I make another array for the images? I don't think so though...


// BEGIN THE GAME:
hangmanSpace();

function hangmanSpace() {
    // random space word generator:
    ranNum = Math.floor(Math.random() * spaceWords.length);
    currentWord = spaceWords[ranNum];

    // Making sure my random generator works and to use while testing...
    console.log(currentWord);

    
    // sets game up so that a word is automatically choosen at random to begin the game    document.getElementById("selectedWord")

    // fills in the correct number of blanks per random word choosen
    // ********************************************************************* IT STILL DOESN'T LIKE BELOW AND ISN'T PRINTING MY UNDERSCORES!! GRRR
    // I learned I can only use "push" here because I have made currentWord an array. Still not showing my blanks although I'm not getting the error message.... Tried the below code and it does exactly what line 50 (below the push) does now... (nothing)
    // blanks = document.getElementById("selectedWord");
    // blanks.textContent = currentWord;
    // innerText and innerHTML don't work

    
    var currentWord = [];
    for (var i = 0; i < currentWord.length; i++) {
        currentWord[i].push("_ ");
        // @@@@ document.getElementById("selectedWord").innerHTML += currentWord[i];
    }

    

    // To start/restart/refresh the game:

    winCountZero = document.getElementById("winCount").innerHTML = winCountZero;
    triesLeftFresh = document.getElementById("triesLeft").innerHTML = triesLeftFresh;
    lettersGuessedFresh = document.getElementById("lettersGuessed").innerHTML = " ";
    document.getElementById("logo").src = "assets/images/logo_1.png";

    
}

document.addEventListener('keyup', function(typing) {
    var keys = (typing.key);
    var pattern = new RegExp('[a-z]');
    var output = pattern.test(keys);
    if (output === false) {
        alert("Please only enter lower-case letters!")
    } 

    letterCounter += 1;

    if (letterCounter > 15) {
        winCountZero = document.getElementById("winCount").innerHTML = winCountZero;
        triesLeftFresh = document.getElementById("triesLeft").innerHTML = triesLeftFresh;
        lettersGuessedFresh = document.getElementById("lettersGuessed").innerHTML = " ";
        document.getElementById("logo").src = "assets/images/logo_1.png";
        letterCounter = 0;
    }


    // ********************** HERE IT CANNOT READ THE LENGTH WHEN I TYPE IN A LETTER ON MY PAGE
    for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === keys) {
            currentWord[i] = keys;
        }
    }

    // *********************************************************
    // Needs work below maybe? I'm confused...
    var triesLeftFresh = triesLeftFresh - letterCounter;

    if (currentWord.join('') === currentWord) {
        winCount += 1;
        document.getElementById("wincount").innerHTML = winCount;
        triesLeftFresh = document.getElementById("triesLeft").innerHTML = triesLeftFresh;
        lettersGuessedFresh = document.getElementById("lettersGuessed").innerHTML = " ";
    }

})

// End Game