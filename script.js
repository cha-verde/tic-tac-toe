
const gameboard = (function () {

    let board = [];

    for (let i = 0; i < 3; i++) {
        let boardRow = [];
        for (let j = 0; j < 3; j++) {
            boardRow[j] = 'e';
        }
        board[i] = boardRow;
    }

    console.log(board);



    function createPlayer(name, shape) {
        return { shape };
    }

    const playerOne = createPlayer("one", "X");
    const playerTwo = createPlayer("two", "0");

    const players = [playerOne, playerTwo];

    let currentPlayer = 0;

    function updatePosition(row, column) {
        if (currentPlayer == 0) {
            if (board[row][column] != 'e') {
                console.log("That position is filled, please choose another position!");
            }
            else {
                board[row][column] = "X";
                if (checkWinner(playerOne.shape)) {
                    console.log("Player 1 Wins!");
                }
                else {
                    if (checkGameOver()) {
                        console.log("It's a tie!");
                    }
                    else {
                        switchPlayer();

                    }
                }
            }
        }
        else {
            if (board[row][column] != 'e') {
                console.log("That position is filled, please choose another position!");
            }
            else {
                board[row][column] = "O";
                if (checkWinner(playerTwo.shape)) {
                    console.log("Player 2 Wins!")
                }
                else {
                    if (checkGameOver()) {
                        console.log("It's a tie!");
                    }
                    else {
                        switchPlayer();

                    }
                }
            }
        }
    }



    function switchPlayer() {
        if (currentPlayer == 0) {
            currentPlayer = 1;
            console.log("Now it's Player 2 turn");
        }
        else {
            currentPlayer = 0;
            console.log("Now it's Player 1 turn");
        }
    }

    function checkWinner(player) {
        //horizontal
        for (let i = 0; i < 3; i++) {
            if (board[i] != player) {
                break;
            }
            if (i == 2) {
                return true;
            }
        }
        //vertical
        for (let i = 0; i < 3; i++) {
            if (board[i][0] != player) {
                break;
            }
            if (i == 2) {
                return true;
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

    function checkGameOver() {
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                if (board[k][l] == 'e') {
                    return false;
                }
            }
        }
        return true;
    }

    const playGame = function (row, column) {
        updatePosition(row, column)
        return board;
    }


    return { playGame };
})();


