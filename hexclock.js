export default class hexClock extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {     
        this.createDOMTree();

        setInterval(() => {
            this.date = new Date();
            this.time = {
                "hour": String(this.date.getHours()).padStart(2, 0),
                "minute":String(this.date.getMinutes()).padStart(2, 0),
                "second": String(this.date.getSeconds()).padStart(2, 0)
            }
            let {hour, minute, second} = this.time;
            this.RGB = [
                parseInt(hour*(255/24)),
                parseInt(minute*(255/60)),
                parseInt(second*(255/60))
            ]
            this.setBackgroundColor();
            this.render();
        }, 1000);
    }

    setBackgroundColor() {
        document.body.setAttribute('style', `background: rgb(${this.RGB[0]}, ${this.RGB[1]}, ${this.RGB[2]}); transition: ease-in .6s`);
    }

    createDOMTree() {
        let clock = document.createElement('section');
        clock.setAttribute('class', 'clock');
        clock.style = 'color: #fff;font-family: Monospace;font-size: 5em;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%)';

        let footer = document.createElement('section');
        footer.setAttribute('class', 'footer');
        footer.innerHTML = `&copy; 2020. Made with ♥ by Gabor Bigors aka Redy.`;
        footer.style = "color: #fff;font-size: 12px; position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%)";
        
        this.shadowRoot.append(clock, footer);
    }

    render() {
        let {hour, minute, second} = this.time;
        this.shadowRoot.querySelector('.clock').textContent = `${hour}:${minute}:${second}`;
    }
}