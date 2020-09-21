import hexClock from './hexclock.js';

customElements.define('hex-clock', hexClock, {});
document.body.prepend(document.createElement('hex-clock'));