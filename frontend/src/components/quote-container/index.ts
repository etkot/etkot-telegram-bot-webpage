import { QuoteComponent } from '..'
import IQuoteComponent from '../quote-component'
import templateString from './quote.template.html'

QuoteComponent()

class QuoteContainer extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    if (!this.shadowRoot) return

    const template = document.createElement('template')
    template.innerHTML = templateString

    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  set quotes(quoteMap: { [key: string]: string[] }) {
    if (!this.shadowRoot) return

    const quoteContainer = this.shadowRoot.querySelector('div')
    if (!quoteContainer) return

    const keyValueMap = Object.entries(quoteMap)
    keyValueMap.sort((a, b) => b[1].length - a[1].length)

    for (const [name, quotes] of keyValueMap) {
      const quoteList = document.createElement('quote-component') as IQuoteComponent
      quoteList.quotes = quotes
      quoteList.innerHTML = `<h2 slot="name" style="margin: 0; flex: 1;" >${name} (${quotes.length})</h2>`
      quoteContainer.appendChild(quoteList)
    }
  }
}

customElements.define('quote-container', QuoteContainer)
export default QuoteContainer
