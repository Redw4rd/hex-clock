export default class hexClock extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.RGB = [];
    }

    connectedCallback() {
        setInterval(() => {
            let date = new Date();
            this.time = {
                "hour": String(date.getHours()).padStart(2, 0),
                "minute":String(date.getMinutes()).padStart(2, 0),
                "second": String(date.getSeconds()).padStart(2, 0)
            }
            this.render();
            let {hour, minute, second} = this.time;
            this.RGB = [
                parseInt(hour*(255/24)),
                parseInt(minute*(255/60)),
                parseInt(second*(255/60))
            ]
            this.setBackgroundColor();
        }, 1000);
    }

    setBackgroundColor() {
        document.body.setAttribute('style', `background: rgb(${this.RGB[0]}, ${this.RGB[1]}, ${this.RGB[2]}); transition: ease-in .6s`);
    }

    render() {
        let {hour, minute, second} = this.time;
        return this.shadowRoot.innerHTML = `${hour}:${minute}:${second}
            <style>
                body {
                    position: relative;
                }
                :host {
                    color: #fff;
                    font-family: Monospace;
                    font-size: 5em;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%)
                }
            </style>
        `;
    }
}