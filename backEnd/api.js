import CoinMarketCap from 'coinmarketcap-api'
 
const apiKey = '62d0d1fa-2e8a-4497-8976-4c70514603da'
const client = new CoinMarketCap(apiKey)
 
let tryAPI = client

export default tryAPI