export class PageEvents {
    constructor() {
        this._setEvents();
    }

    _setEvents() {
        const contentGame = document.querySelector('.content__game');
        console.log(window);

        window.onscroll = (event) => {
            console.log(event);
        };
    }
}