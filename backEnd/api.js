import CoinMarketCap from 'coinmarketcap-api'
 
// get api https://coinmarketcap.com/api/
const apiKey = 'your-api-key'
const client = new CoinMarketCap(apiKey)
 
let tryAPI = client

export default tryAPI
