import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHistory,faCoins,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { createChart } from 'lightweight-charts';
import {CryptoApiService} from '../crypto-api.service'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper/core';
import { TokenServiceService } from '../token-service.service';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,Autoplay]);
declare const TradingView: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('ChartDIV') ChartDIV!: ElementRef;
  @ViewChild('coinPrice') coinPrice!: ElementRef;
  
  cryptoData : any[] = []
  // api array 
  newData : any[] = []
  // array keys
  keys : String | any;
  // array length
  ArrayLength : Number | undefined ;

  constructor(private library: FaIconLibrary , private cryptoAPI :CryptoApiService ,private tokenService : TokenServiceService  ) {
    // fortawesome
    library.addIcons(faHistory,faCoins,faUserCircle)
   }

  ngAfterViewInit() {
    this.tokenService.getUserToken('loginDatas')
    //get coin api from server
    this.cryptoAPI.CryptoAPI().subscribe(data => { 
      this.cryptoData.push(data)
      // get key value of each coin
      this.keys = Object.keys(data)
      // return this object length 
      this.ArrayLength = Object.getOwnPropertyNames(data).length;
      for(let i = 0 ; i < this.ArrayLength ; i ++){
        this.newData.push(this.cryptoData[0][this.keys[i]])
    }
    })
    setTimeout(() => {
      for ( let item of this.newData){
      
        // get chart api from tradingview , https://www.tradingview.com/widget/advanced-chart/
               new TradingView.MediumWidget(
                {
                "symbols": [
                  [
                    `BINANCE:${item.symbol}USDT|12M`
                  ]
                ],
                "chartOnly": true,
                "width": "100%",
                "height": "100%",
                "locale": "en",
                "colorTheme": "dark",
                "gridLineColor": "rgba(42 ,46, 57, 0)",
                "trendLineColor": "#2962FF",
                "fontColor": "#787B86",
                "underLineColor": "rgba(41, 98, 255, 0.3)",
                "underLineBottomColor": "rgba(41, 98, 255, 0)",
                "isTransparent": true,
                "autosize": true,
                "container_id": `tradingview_${item.name}`
              }
                );
}
    }, 1000);
      
  }
  // if 24h value of coin minus , return red box 
  findNegativeString(stirng : string) { 
    if (stirng.toString().indexOf('-') !== -1) {
      return 'homePage-coin-coins-status homePage-coin-coins-status-sell'
    }else{
      return 'homePage-coin-coins-status'
    }
  }

}
