import('./body-text/body-text').then(({ default: BodyText }) => customElements.define('body-text', BodyText as any))

export {}
