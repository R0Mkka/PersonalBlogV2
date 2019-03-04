export class Other {
    constructor() {
        this._imagesCollection = document.querySelectorAll('img');
        this._header = document.querySelector('.header');
        this._headerBack = document.querySelector('.header__background');
        this._gameBack = document.querySelector('.game__background');

        this._aboutYOffset = this._header.scrollHeight;
    }

    set() {
        this._addEventOnMouseClick();
        this._disableDragAndDrop();

        window.addEventListener('resize', () => {
            this._countOffsets();
        });

        window.addEventListener('scroll', () => {
            this._controlZIndexes();
        });
    }

    _addEventOnMouseClick() {
        document.querySelector('.card__more-info img').onclick = function() {
            window.scrollTo({
                top: this._aboutYOffset,
                behavior: 'smooth'
            });
        }.bind(this);
    }

    _disableDragAndDrop() {
        for (let i = 0; i < this._imagesCollection.length; i++) {
            this._imagesCollection[i].ondragstart = () => false;
        }
    }

    _countOffsets() {
        this._aboutYOffset = this._header.clientHeight;
    }

    _controlZIndexes() {
        if (window.scrollY >= this._aboutYOffset) {
            this._gameBack.style.zIndex = '-1';
            this._headerBack.style.zIndex = '-2';
        } else {
            this._gameBack.style.zIndex = '-2';
            this._headerBack.style.zIndex = '-1';
        }
    }
}