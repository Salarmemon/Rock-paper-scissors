//utility functions

// tartget 1elements in a convenient way\
const getElm = (value, method, isAll=false) => {
    return method === "id" ? 
    document.getElementById(value) :
     method === "class" && !isAll ?
     document.querySelector(`.${value}`) :
     method === "class" && isAll ?
     document.querySelectorAll(`.${value}`) :
     "Method not supported";
}




// variables and element references
const choiceBtns = getElm("choice-btn", "class", true);
const playerScoreElm = getElm("player-score", "id");
const computerScoreElm = getElm("computer-score", "id");
const resultDialog = getElm("result-dialog", "class");
const roundStatus = getElm("status", "class");
const hoverSound = getElm("hover-sound", "id");
const clickSound = getElm("click-sound", "id");
const numOfRounds = 5;
console.log(choiceBtns, playerScoreElm, computerScoreElm, resultDialog, roundStatus)
let playerScore = 0;
let computerScore = 0;

//decide  round winner

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

// update UI 

const updateUI = (result) => {
    playerScoreElm.textContent = playerScore;
    computerScoreElm.textContent = computerScore;
    roundStatus.textContent = result;
}
// generate computer's choice

const generateComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor((Math.random() * 3));
    return choices[randomIndex];
}


// hover sound effects
let lastPlayed = 0;

const playSound = (sound) => {

    const now = Date.now();
    if (now - lastPlayed < 400) return;
    sound.currentTime = 0;

    sound.play();
    lastPlayed = now;
}
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    playSound(clickSound);
    const computerChoice = generateComputerChoice();
    const playerChoice = e.target.id;
    
    const roundResult = decideRound(playerChoice, computerChoice);
    
    updateUI(roundResult);
})
})
choiceBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        playSound(hoverSound);
    })
})