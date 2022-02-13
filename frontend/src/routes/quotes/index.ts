import { gql } from 'graphql-request'
import { QuoteContainer } from '../../components'
import IQuoteContainer from '../../components/quote-container'
import { authGuard } from '../../utils/authGuard'
import { client } from '../../utils/networkConfigs'
import './index.css'

type Quote = {
  name: string
  quote: string
}

authGuard()

QuoteContainer()

const quotesQuery = gql`
  query {
    quotes: getAllQuotes {
      name
      quote
    }
  }
`

const { quotes }: { quotes: Quote[] } = await client.request(quotesQuery)

const quoteMap: { [key: string]: string[] } = {}
for (const quote of quotes) {
  if (!quoteMap[quote.name]) {
    quoteMap[quote.name] = []
  }

  quoteMap[quote.name].push(quote.quote)
}

const quoteContainer = document.getElementById('quote-container') as IQuoteContainer
quoteContainer.quotes = quoteMap
