# **CRYPTO EXCHANGE APP** 

This project was created just for fun, that does not use blockchain

## Usage 

**Settings**
```
get api key from https://coinmarketcap.com/api/
add your connect url for mongodb database , go backEnd/server.js and replace connectURL variable with your own url 
```


``` npm
git clone https://github.com/Vrm4/Crypto-Exchange-Project---MEAN.git

cd backEnd
npm install
node server.js

cd frontEnd 
npm install 
ng serve
```
 **`if you get NGCC error , go node frontEnd\node_modules\@angular\compiler-cli\ngcc and delete __ngcc_lock_file__ file`**


## File structure

- |-- **backend** 
    - |-- schemas => this folder have database schemas
    - |-- api.js => it have api from coinmarketcap.com 
    - |-- server.js => database operations 
- |-- **fronted** => Angular folders
    - |--src
       - |-- app
            - |-- buy-history => trading history
            - |-- chart => chart of coins
            - |-- dashboard => dashboard
            - |-- deposit => balance transactions
            - |-- footer => footer
            - |-- header => header 
            - |-- interfaces => interfaces for api 
            - |-- login => login
            - |-- market-detail => place of trading coins
            - |-- markets => coins
            - |-- messages => show messages using message service
            - |-- register => register
            - |-- wallet => wallet
            - |-- crypto-api.service.ts => get data from server
            - |-- message.service.ts => show messages 
            - |-- token-service.service.ts => add, update , get token for check and such
            - |-- user-data.service.ts => get user data
        - |-- assets
            - |-- images => photo of coins 
            - |-- chart => js file for chart library from [Tradingview](https://www.tradingview.com/widget/advanced-chart/)  


        
