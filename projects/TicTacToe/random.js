const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMB = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
var circleTurn;

startGame();
console.log(cellElements);

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once:true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');

}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!';
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show');
}

function endGameCircle(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!';
    }
    else {
        winningMessageTextElement.innerText = `O's Wins!`
    }
    winningMessageElement.classList.add('show');
}

function endGameX(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!';
    }
    else {
        winningMessageTextElement.innerText = `X's Wins!`
    }
    winningMessageElement.classList.add('show');
}

function handleClick(e){
    //place the mark
    const cell = e.target;
    console.log(cell);
    const currentClass = CIRCLE_CLASS;
    placeMark(cell, currentClass);
    getRandom();
    //check for win
    if (checkWin(currentClass)){
        endGameCircle(false);
    }
    //check for draw 
    else if (isDraw()){
        endGame(true);
    }
    else{
        //switch turns
        // swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    // AN ALTERNATE WAY TO WRITE THE ALGORITHM: 
    // return WINNING_COMB.some(combination => {
    //     return combination.every(index =>{
    //         return cellElements[index].classList.contains(currentClass);
    //     })
    // })

    for (var i = 0; i < WINNING_COMB.length; i++){
        var first = WINNING_COMB[i][0];
        var second = WINNING_COMB[i][1];
        var third = WINNING_COMB[i][2];
        if (cellElements[first].classList.contains(currentClass)
        && cellElements[second].classList.contains(currentClass)
        && cellElements[third].classList.contains(currentClass)){
            return true;
        }
    }
    return false;
}

function isDraw(){
//     ANOTHER WAY OF WRITING THE ALGORITHM:
//     return [...cellElements].every(cell => {
//         return cell.classList.contains(X_CLASS)
//     })
// }
    var drawy = true;
    for (var i = 0; i < cellElements.length; i++){
        if (!(cellElements[i].classList.contains(X_CLASS) || cellElements[i].classList.contains(CIRCLE_CLASS))){
            drawy = false;
        }
    }
    return drawy;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }  

function isArrayFull( arr )
{
  for ( var i = 0, l = arr.length; i < l; i++ )
  {
    if (!(cellElements[i].classList.contains(X_CLASS) || cellElements[i].classList.contains(CIRCLE_CLASS)))
    {
      return false;
    }
  }
  return true;
}

function getRandom(){
    var rand = getRandomInt(9);
    if (isArrayFull(cellElements)){
        if (checkWin(X_CLASS)){
            endGame(false);
        }
        else if (isDraw()){
            endGame(true);
        }
    }
    else if (!(cellElements[rand].classList.contains(X_CLASS) || cellElements[rand].classList.contains(CIRCLE_CLASS))){
        const cell = cellElements[rand];
        console.log(rand);
        placeMark(cell, X_CLASS);
        if (checkWin(X_CLASS)){
            endGameX(false);
        }
    }
    else {
        getRandom();
        console.log(rand);
    }
}
