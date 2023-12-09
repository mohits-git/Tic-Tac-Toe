class TicTacToe {
    constructor() {
        this.turn = 0;
        this.currentPlayer = this.firstPlayer();
        this.gameBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }
    startGame() {
        this.addEvents();
    }
    addEvents() {
        const keys = document.querySelector('.gamearea');
        const Reset = document.querySelector('.reset');
        Reset.addEventListener('click', () => {
            this.turn = 0;
            this.currentPlayer = this.firstPlayer();
            this.gameBoard = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            for (let i = 0; i < 9; i++) {
                document.querySelector(`.box${i}`).innerText = '';
                document.querySelector(`.box${i}`).removeAttribute('disabled');
            }
            document.querySelector('.over').classList.toggle('hidden');
            document.querySelector('main').style.filter = '';
        });
        keys.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('button')) {
                this.addCharacter(target.value);
                this.isGameOver();
            }
        });
    }

    firstPlayer() {
        let first = 'O';
        if ((Math.random() * 2) > 1) {
            first = 'X';
        }
        document.querySelector('h3').innerText = `First ${first}'s Turn`;
        return first;
    }

    nextTurn() {
        this.turn++;
        this.changeCurrentPlayer();
    }

    changeCurrentPlayer() {
        if (this.currentPlayer === 'X') {
            this.currentPlayer = 'O';
        }
        else {
            this.currentPlayer = 'X';
        }
        document.querySelector('h3').innerText = `${this.currentPlayer}'s Turn`;
    }

    addCharacter(value) {
        value = parseInt(value);
        const row = Math.floor(value / 3);
        const col = value % 3;
        const boxId = `.box${value}`;
        this.gameBoard[row][col] = this.currentPlayer;
        document.querySelector(boxId).innerText = this.currentPlayer;
        document.querySelector(boxId).setAttribute('disabled', '');
    }

    isGameOver() {
        for (let i = 0; i < 3; i++) {
            if (this.gameBoard[i][0] !== null && this.gameBoard[i][1] === this.gameBoard[i][0] && this.gameBoard[i][1] === this.gameBoard[i][2]) {
                return this.playerWon();
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.gameBoard[0][i] !== null && this.gameBoard[1][i] === this.gameBoard[0][i] && this.gameBoard[1][i] === this.gameBoard[2][i]) {
                return this.playerWon();
            }
        }
        if (this.gameBoard[0][0] !== null && this.gameBoard[1][1] === this.gameBoard[0][0] && this.gameBoard[1][1] === this.gameBoard[2][2]) {
            return this.playerWon();
        }
        if (this.gameBoard[0][2] !== null && this.gameBoard[2][0] === this.gameBoard[1][1] && this.gameBoard[1][1] === this.gameBoard[0][2]) {
            return this.playerWon();
        }

        if (this.turn === 8) {
            document.querySelector('h2').innerText = "TIE!!! -- GameOver";
            return this.gameOver();
        }

        this.nextTurn();
    }
    playerWon() {
        document.querySelector('h2').innerText = `PLAYER ${this.currentPlayer} WON!`;
        return this.gameOver();
    }

    gameOver() {
        document.querySelector('main').style.filter = 'blur(5px)';
        document.querySelector('.over').classList.toggle('hidden');

        for (let i = 0; i < 9; i++) {
            document.querySelector(`.box${i}`).setAttribute('disabled', '');
        }
    }
}

const newGame = new TicTacToe;
newGame.startGame();