export class Parallax {
    constructor() {
        this._headerBack = document.querySelector('.header__background');
        this._gameBack = document.querySelector('.game__background');
        this._about = document.querySelector('.about');

        this._gameBackOffset = 0;
    }

    set() {
        this._showElements();
        this._countOffsets();
        
        window.onscroll = function() {
            onScroll.call(this);
        }.bind(this);

        window.onresize = function() {
            this._countOffsets();

            onScroll.call(this);
        }.bind(this);

        function onScroll() {
            const headerBackYOffset = window.scrollY / 2;
            const gameBackYOffset = (window.scrollY - this._gameBackOffset) / 2;
            
            this._setTranslate(headerBackYOffset, this._headerBack);
            this._setTranslate(gameBackYOffset, this._gameBack);
        };
    }

    _showElements() {
        this._headerBack.style.display = 'block';
        this._gameBack.style.display = 'block';
    }

    _countOffsets() {
        this._gameBackOffset = this._headerBack.scrollHeight + this._about.scrollHeight;
    }

    _setTranslate(yPos, element) {
        element.style.transform = "translate3d(0, " + yPos + "px, 0)";
    }
}