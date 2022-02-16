import templateString from './template.html'

class HeaderText extends HTMLHeadingElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    if (!this.shadowRoot) return

    const template = document.createElement('template')
    template.innerHTML = templateString

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('header-text', HeaderText, { extends: 'h1' })
export default HeaderText
