import templateString from './body-text.template.html'

class BodyText extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    if (!this.shadowRoot) return

    const template = document.createElement('template')
    template.innerHTML = templateString

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('body-text', BodyText)
export default BodyText
