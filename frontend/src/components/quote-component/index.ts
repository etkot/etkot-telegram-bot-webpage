import templateString from './quote.template.html'

class QuoteComponent extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    if (!this.shadowRoot) return

    const template = document.createElement('template')
    template.innerHTML = templateString

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  set quotes(quotes: string[]) {
    if (!this.shadowRoot) return

    const quoteList = this.shadowRoot.querySelector('ul')
    if (!quoteList) return

    quoteList.innerHTML = quotes.map((quote) => `<li>${quote}</li>`).join('')
  }
}

customElements.define('quote-component', QuoteComponent)
export default QuoteComponent
