//utility functions

// tartget 1elements in a convenient way\
const getElm = (value, method, isAll=false) => {
    return method === "id" ? 
    document.getElementById(value) :
     method === "class" && !isAll ?
     document.getElementsByClassName(value) :
     method === "class" && isAll ?
     document.querySelectorAll(`.${value}`) :
     "Method not supported";
}


// compare choices 
const decideRound = (player, computer) => {
    if (player === computer) {
        return `it's a tie: ${player} vs ${computer}`;
    } else if ((player === "rock" && computer === "scissors") || 
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")) {

        playerScore++;
        return `You win: ${player} beats ${computer}`;
        

    } else {
        computerScore++;
        return `You lost: ${computer} beats ${player}`;
        
    }
}

// variables and element references
const choiceBtns = getElm("choice-btn", "class", true);
const playerScoreElm = getElm("player-score", "id");
const computerScoreElm = getElm("computer-score");
const resultDialog = getElm("result-dialog", "class");
const numOfRounds = 5;
let playerScore = 0;
let computerScore = 0;
// generate computer's choice

const generateComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor((Math.random() * 3));
    return choices[randomIndex];
}


// hover sound effects
let lastPlayed = 0;

const playSoundHover = () => {
    const sound = document.getElementById("hover-sound");
    const now = Date.now();
    if (now - lastPlayed < 1000) return;
    sound.currentTime = 0;

    sound.play();
    lastPlayed = now;
}
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const computerChoice = generateComputerChoice();
    const playerChoice = e.target.id;
    
    const roundResult = decideRound(playerChoice, computerChoice);
    console.log(roundResult);
})
})
choiceBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", playSoundHover);
})