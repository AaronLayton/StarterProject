export class MyElement extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        console.log('constructor');
    }
    connectedCallback() {
        console.log('connectedCallback');
        this.innerHTML = `
            <h1>This is a MyElement tag<h1>
        `;
    }
    disconnectedCallback() {
        console.log('disconnectedCallback');
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('attributeChangedCallback', attrName, oldVal, newVal);
    }
}

window.customElements.define('my-element', MyElement);
