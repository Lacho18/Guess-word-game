let wordsLevel1 = ["led", "med", "kat", "mlad", "alo", "neshto", "rim"];
let wordsLevel2 = ["kartof", "zele", "zenica", "morkov", "fytbol", "motor", "dybay", "parish"];
let wordsLevel3 = ["ychilishte", "helicopter", "lamborgini", "vendeta", "kaliforniq"];

let wrongGuesses = document.getElementById("counter");
let gameResult = document.getElementById("gameResult");
let inputField = document.getElementById("inputField");
let wrongGuessesCounter = 0;
let guessWord = "";

let newGame = () => {
    let level;
    let mainBox = document.getElementsByClassName("main-div");

    mainBox[0].style.display = "none";

    let selectDificultyDiv = document.createElement("div");
    selectDificultyDiv.className = "dificulties";
    document.body.appendChild(selectDificultyDiv);

    //Removes every letters from the last word
    let lettersDiv = document.getElementsByClassName("letters-div");
    if (lettersDiv[0].firstChild) {
        while (lettersDiv[0].firstChild) {
            lettersDiv[0].removeChild(lettersDiv[0].firstChild);
        }
    }

    //Removes the text that appearec after the game is won or lost
    let gameResult = document.getElementById("gameResult");
    if (gameResult.innerHTML !== "") {
        gameResult.innerHTML = "";
    }

    if(wrongGuessesCounter > 0) {
        wrongGuessesCounter = 0;
        wrongGuesses.innerHTML = ""+wrongGuessesCounter;
    }

    //Creates buttons that can select dificulties
    let dificulties = ["easy", "normal", "hard"];
    dificulties.forEach(dificultie => {
        let button = document.createElement("button");
        button.innerHTML = dificultie;
        button.addEventListener('click', () => {
            level = dificultie;
            document.body.removeChild(selectDificultyDiv);
            mainBox[0].style.display = "inline";

            Game(level);
        });

        selectDificultyDiv.appendChild(button);
    })
}

//Function that selects the word by the given dificulty and creates the number of paragrafs
function Game(level) {
    let words;

    switch (level) {
        case "easy": words = wordsLevel1;
            break;
        case "normal": words = wordsLevel2;
            break;
        case "hard": words = wordsLevel3;
            break;
        default: words = undefined;
            break;
    }

    //Chosses a word from the selected array
    let index = Math.round(Math.random() * words.length);
    if (index === words.length) {
        index--;
    }
    guessWord = words[index];

    //Creates the visible letters paragrafs
    createLetters(guessWord);
}

//Creates the visible letters paragrafs
let createLetters = (word) => {
    let lettersDiv = document.getElementsByClassName("letters-div");

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
        let newP = document.createElement("p");
        newP.id = "" + i;
        newP.className = "letters-paragraf";

        if (i === 0) {
            newP.innerHTML = word[0];
        }
        else if (i + 1 === word.length) {
            newP.innerHTML = word[word.length - 1];
        }
        else {
            newP.innerHTML = "_";
        }

        lettersDiv[0].appendChild(newP);
    }
}

function checkForLetters(word, letter) {
    let positions = [];

    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            positions.push(i);
        }
    }

    return positions;
}

function checkForWin(word) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        let p = document.getElementById(`${i}`);

        if (p.innerHTML === "_") {
            count++;
        }
    }

    if (count === 0) {
        return true;
    }
    else {
        return false;
    }
}

function askWindow() {
    let div = document.createElement("div");
    div.className = "ask-window";
    let mainBox = document.getElementsByClassName("main-div");
    mainBox[0].style.display = "none";
    document.body.appendChild(div);
    let p = document.createElement("p");
    p.innerHTML = "Do you want to play again ?";
    let yesButton = document.createElement("button");
    yesButton.innerHTML = "Yes";
    yesButton.addEventListener('click', () => {
        newGame();
        div.remove();
    })
    let noButton = document.createElement("button");
    noButton.innerHTML = "No";
    noButton.addEventListener('click', () => {
        div.remove();
    });

    div.appendChild(p);
    div.appendChild(yesButton);
    div.appendChild(noButton);
}

//Listener that activates every time when a letter is inserted
inputField.addEventListener('input', (e) => {
    inputEventHandler(e, guessWord);
})

function inputEventHandler(e, guessWord) {
    e.preventDefault();

    //Finds the position of the letters
    let positions = checkForLetters(guessWord, e.target.value);
    console.log(positions);

    //Checks if the letter is inside the word
    if (positions.length === 0) {
        wrongGuessesCounter++;
        wrongGuesses.innerHTML = `${wrongGuessesCounter}`;
    }
    else {
        //Adds the letters to the visible paragrafs
        for (let i = 0; i < positions.length; i++) {
            let paragraf = document.getElementById(`${positions[i]}`);
            paragraf.innerHTML = guessWord[positions[i]];
        }
    }

    //Checks if the game is lost
    if (wrongGuessesCounter >= 6) {
        gameResult.innerHTML = `Game over. The word was ${guessWord}.`;
        setTimeout(() => {
            askWindow();
        }, 5000);
    }

    //Checks if the game is won
    if (checkForWin(guessWord)) {
        gameResult.innerHTML = "Congratulations. You guessed the word!";
        setTimeout(() => {
            askWindow();
        }, 5000);
    }

    //Clears the input fields
    setTimeout(() => {
        inputField.value = "";
    }, 100);
}

newGame();