export class Game {
    constructor() {
        this.leftPistol = document.querySelector('.left-pistol');
        this.rightPistol = document.querySelector('.right-pistol');
        this.leftBoom = document.querySelector('.left-boom');
        this.rightBoom = document.querySelector('.right-boom');
        this.leftScore = document.querySelector('.score-first span');
        this.rightScore = document.querySelector('.score-second span');
        this.restartButton = document.querySelector('.actions__restart');

        this._setEvents();
    }

    _setEvents() {
        this.leftPistol.onmousedown = () => {
            const currentScore = this.leftScore.textContent;

            this._showBoomImage(this.leftBoom);
            this._updateScore(currentScore, this.leftScore);
        }

        this.rightPistol.onmousedown = () => {
            const currentScore = this.rightScore.textContent;
        
            this._showBoomImage(this.rightBoom);
            this._updateScore(currentScore, this.rightScore);
        }
        
        this.restartButton.onclick = () => {
            this.restartButton.style.transform = 'rotate(-360deg)';
        
            this._updateScore(-1, this.leftScore);
            this._updateScore(-1, this.rightScore);
        
            setTimeout(() => {
                this.restartButton.style.transform = '';
            }, 300);
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
}