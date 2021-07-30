import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { TokenServiceService } from '../token-service.service';
import { User } from '../interfaces/User';
import { CryptoApiService } from '../crypto-api.service';
declare const TradingView: any;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  params : string | undefined

  cryptoData : any[] = []
  // api array 
  newData : any[] = []
  // array keys
  keys : String | any;
  // array length
  ArrayLength : Number | undefined ;

  resultData : any ;
  constructor(private _location: Location , private library: FaIconLibrary , private route : ActivatedRoute , private cryptoAPI : CryptoApiService) {
    library.addIcons(faArrowLeft)
   }
  
  ngOnInit(): void {
    this.params = this.route.snapshot.params.name

    this.cryptoAPI.CryptoAPI().subscribe(data => {
      this.cryptoData.push(data)
      // get key value of each coin
      this.keys = Object.keys(data)
      // return this object length 
      this.ArrayLength = Object.getOwnPropertyNames(data).length;
      for(let i = 0 ; i < this.ArrayLength ; i ++){
        this.newData.push(this.cryptoData[0][this.keys[i]])
    }
    this.resultData = this.newData.filter((item) => {
        return  item.symbol === this.params?.toUpperCase()
    })
    console.log(this.resultData)
    })
    //url name like /btc
    
    // get chart api from tradingview , https://www.tradingview.com/widget/advanced-chart/
    new TradingView.widget(
      {
        "width": 410,
        "height": 300,
        "symbol": `${this.params}USDT`,
        "interval": "240",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "save_image": false,
        "container_id": "tradingview_043e5"
      }
      );
  }
  chartLocation(){
    this._location.back()
  }

}
