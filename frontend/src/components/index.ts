import('./body-text/body-text').then(({ default: BodyText }) => customElements.define('body-text', BodyText as any))

console.log('wtf 3?')

export {}
