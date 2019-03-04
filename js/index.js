import { Game } from './game';
import { Parallax } from './parallax';
import { Other } from './other';

const loading = document.querySelector('.loading');

const game = new Game();
const parallax = new Parallax();
const other = new Other();

game.set();
parallax.set();
other.set();

setTimeout(() => {
    // window.scrollTo(0, 0);

    loading.style.opacity = '0';

    setTimeout(() => {
        loading.remove();
    }, 600);
}, 1000);

