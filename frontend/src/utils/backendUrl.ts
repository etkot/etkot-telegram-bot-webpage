console.log(process.env.NODE_ENV)

export const backendUrl = process.env.NODE_ENV === 'production' ? 'https://api.nipatiitti.com' : 'http://localhost:5000'
