export class Game {
    constructor() {
        this.leftPistol = document.querySelector('.left-pistol');
        this.rightPistol = document.querySelector('.right-pistol');
        this.leftBoom = document.querySelector('.left-boom');
        this.rightBoom = document.querySelector('.right-boom');
        this.leftScore = document.querySelector('.score-first .count');
        this.rightScore = document.querySelector('.score-second .count');
        this.leftName = document.querySelector('.score-first .name');
        this.rightName = document.querySelector('.score-second .name');
        this.winnerNameBlock = document.querySelector('.result-modal__winner span');
        this.restartButton = document.querySelector('.actions__restart');
        this.settingsButton = document.querySelector('.actions__settings');

        this.flag = document.querySelector('.flag');

        this._options = document.querySelector('.cover');
        this._resultModal = document.querySelector('.result-modal');

        this._gameModeOptions = document.querySelectorAll('.cover .game-mode .option__item');
        this._difficultyLevelOptions = document.querySelectorAll('.cover .difficulty-level .option__item');

        this._isDifficultyLevelDisabled = false;
        this.fire = false;
        this.winner = null;

        this._currentGameMode = 0;
        this._currentDifficultyLevel = 1;

        this._startButton = document.querySelector('.cover .start');
        this._tryAgainButton = document.querySelector('.result-modal .try-again');

        this.GAME_TIMER = null;
        this.AI_TIMER = null;
    }

    set() {
        this._setEvents();
        this._setOptionsEvents();
    }

    _setEvents() {
        this.leftPistol.onmousedown = () => {
            this._showBoomImage(this.leftBoom);

            if (this.fire && !this.winner) {
                const currentScore = this.leftScore.textContent;

                this.winner = 1;

                this._updateScore(currentScore, this.leftScore);
            } else {
                const currentScore = this.rightScore.textContent;

                this.winner = 2;
                
                this._updateScore(currentScore, this.rightScore);
            }

            this._showResultModal();
        }

        this.rightPistol.onmousedown = () => {
            this._showBoomImage(this.rightBoom);

            if (this.fire && !this.winner) {
                const currentScore = this.rightScore.textContent;

                this.winner = 2;
                
                this._updateScore(currentScore, this.rightScore);
            } else {
                const currentScore = this.leftScore.textContent;

                this.winner = 1;

                this._updateScore(currentScore, this.leftScore);
            }

            this._showResultModal();
        }
        
        this.restartButton.onclick = () => {
            this.restartButton.style.transform = 'rotate(-360deg)';
        
            this._updateScore(-1, this.leftScore);
            this._updateScore(-1, this.rightScore);
        
            setTimeout(() => {
                this.restartButton.style.transform = '';
            }, 300);
        }

        this.settingsButton.onclick = () => {
            this._options.style.display = 'flex';
            
            if (this.GAME_TIMER) clearTimeout(this.GAME_TIMER);
            if (this.AI_TIMER) clearTimeout(this.AI_TIMER);
        }
    }

    _updateScore(currentScore, element) {
        if (!currentScore || !Number(currentScore)) {
            element.textContent = '1';
        } else {
            element.textContent = (Number(currentScore) + 1).toString();
        }
    }
    
    _showBoomImage(element) {
        element.style.display = 'inline-block';
    
        setTimeout(() => {
            element.style.display = 'none'
        }, 80);
    }

    _setOptionsEvents() {
        for (let i = 0; i < this._gameModeOptions.length; i++) {
            this._gameModeOptions[i].onclick = () => {
                if (i !== 0) {
                    this._isDifficultyLevelDisabled = true;
                    this._difficultyLevelOptions[0].parentNode.classList.add('disabled');
                } else {
                    this._isDifficultyLevelDisabled = false;
                    this._difficultyLevelOptions[0].parentNode.classList.remove('disabled');
                }

                this._setNewGameMode(i);

                this._currentGameMode = i;
            };
        }

        for (let i = 0; i < this._difficultyLevelOptions.length; i++) {
            this._difficultyLevelOptions[i].onclick = () => {
                if (!this._isDifficultyLevelDisabled) {
                    this._setNewDifficultyLevel(i);

                    this._currentDifficultyLevel = i;
                }
            };
        }

        this._startButton.onclick = () => {
            this._options.style.display = 'none';

            this._startGame();
        }

        this._tryAgainButton.onclick = () => {
            this._resultModal.style.display = 'none';

            this._startGame();
        }
    }

    _setNewGameMode(index) {
        for (let i = 0; i < this._gameModeOptions.length; i++) {
            this._gameModeOptions[i].classList.remove('active');
        }

        this._gameModeOptions[index].classList.add('active');
    }

    _setNewDifficultyLevel(index) {
        for (let i = 0; i < this._difficultyLevelOptions.length; i++) {
            this._difficultyLevelOptions[i].classList.remove('active');
        }

        this._difficultyLevelOptions[index].classList.add('active');
    }

    _startGame() {
        if (this.GAME_TIMER) clearTimeout(this.GAME_TIMER);
        if (this.AI_TIMER) clearTimeout(this.AI_TIMER);

        this.winner = null;

        const player1Name = (this._currentGameMode === 0) ? 'Player' : 'Player 1';
        const player2Name = (this._currentGameMode === 0) ? 'AI' : 'Player 2';

        this.leftName.textContent = player1Name;
        this.rightName.textContent = player2Name;

        let shootDelay = 0;

        switch(this._currentDifficultyLevel) {
            case 0: 
                shootDelay = 1500 + Math.random() * 3500;
                break;
            case 1:
                shootDelay = 700 + Math.random() * 2500;
                break;
            case 2:
                shootDelay = Math.random() * 2000;
                break;
        }

        new Promise(resolve => {
            const random = Math.random() * 10000;     

            // console.log({random, shootDelay});

            this.GAME_TIMER = setTimeout(() => {
                resolve(random);
            }, random);
        })
        .then(_ => {
            this.GAME_TIMER = null;

            this.flag.style.display = 'block';
            this.fire = true;

            setTimeout(() => {
                this.flag.style.display = 'none';
            }, 450);

            this.AI_TIMER = setTimeout(() => {
                this.AI_TIMER = null;

                if (!this.winner) {
                    triggerMouseEvent(this.rightPistol, "mousedown");
                }
            }, shootDelay);
        })
        .catch(error => {
            console.error('PROMISE: ' + error);
        });     

        function triggerMouseEvent (node, eventType) {
            let clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent(eventType, true, true);
            node.dispatchEvent(clickEvent);
        }
    }

    _showResultModal() {
        const winner = (this.winner === 1) ? this.leftName.textContent : this.rightName.textContent;

        this.winnerNameBlock.textContent = winner;

        this._resultModal.style.display = 'flex';

        this.fire = false;
    }
}