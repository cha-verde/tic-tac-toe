
const gameboard = (function () {

    let board = [];

    function initializeBoard(){
        for (let i = 0; i < 3; i++) {
            let boardRow = [];
            for (let j = 0; j < 3; j++) {
                boardRow[j] = '';
            }
            board[i] = boardRow;
        }
    }

    initializeBoard();

    function refreshBoard(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                fillBox(i, j);
            }
        }
    }

    function fillBox(number1, number2) {
        const box = document.querySelector('[data-row="' + number1 + '"][data-column="' + number2 + '"]');
        box.textContent = board[number1][number2];
    }

    refreshBoard();

    function createPlayer(name, shape) {
        return { name, shape };
    }

    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "0");

    let currentBoxCount = 0;

    let currentPlayer = 0;

    const displayBoard = document.querySelector('.board'); 

    const resetButton = document.querySelector('.reset-button');

    resetButton.disabled = true;
    
    const statusText = document.querySelector('.status-text')

    statusText.textContent = "Now it's Player 1 turn."

    resetButton.addEventListener("click", () => {
        board = [];
        initializeBoard();
        refreshBoard();
        resetButton.disabled = true;
        displayBoard.style.pointerEvents = "auto";
        statusText.textContent = "Now it's Player 1 turn."
        currentPlayer = 0;
        currentBoxCount = 0;
    })
    function updatePosition(row, column, player) {
        if (board[row][column] != '') {
            console.log("That position is filled, please choose another position!");
            return;
        }

        board[row][column] = player.shape;
        currentBoxCount++;
        if (currentBoxCount == 9) {
            refreshBoard();
            statusText.textContent = "It's a tie!";
            resetButton.disabled = false;
            return;
        }

        if (checkWinner(player.shape)) {
            refreshBoard();

            statusText.textContent = player.name + " Wins!";
            displayBoard.style.pointerEvents = "none";
            resetButton.disabled = false;
            return;
        }
        refreshBoard();
        switchPlayer();

    }



    function switchPlayer() {
        if (currentPlayer == 0) {
            currentPlayer = 1;
            statusText.textContent = "Now it's Player 2 turn";
        }
        else {
            currentPlayer = 0;
            statusText.textContent = "Now it's Player 1 turn";
        }
    }

    function checkWinner(player) {
        //horizontal
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != player) {
                    break;
                }
                if (j == 2) {
                    return true;
                }
            }
        }
        //vertical
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[j][i] != player) {
                    break;
                }
                if (j == 2) {
                    return true;
                }
            }
        }
        //diagonal
        for (let i = 0; i < 3; i++) {
            if (board[i][i] != player) {
                break;
            }
            if (i == 2) {
                return true;
            }
        }
        //diagonal
        for (let j = 0; j < 3; j++) {
            if (board[j][2 - j] != player) {
                break;
            }
            if (j == 2) {
                return true;
            }
        }
    }


    document.querySelectorAll('.shape-box').forEach(box => 
        box.addEventListener('click', () => playGame(box.dataset.row, box.dataset.column))
      );
      

    const playGame = function (row, column) {
        if (currentPlayer == 0) {
            updatePosition(row, column, playerOne);
        }
        else {
            updatePosition(row, column, playerTwo);
        }
        return board;
    }


    return { playGame };
})();



