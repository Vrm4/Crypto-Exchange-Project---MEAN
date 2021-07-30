import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { CryptoApiService } from '../crypto-api.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  
  cryptoData : any[] = []
  newData : any[] = []
  keys : String | any;
  ArrayLength : Number | any;

  constructor(private library: FaIconLibrary ,private cryptoAPI :CryptoApiService) {
    library.addIcons(faSearch)
   }

  ngOnInit(): void {
    this.cryptoAPI.CryptoAPI().subscribe(data => { 
    console.log(data)
    this.cryptoData.push(data)
    this.keys = Object.keys(data)
    this.ArrayLength = Object.getOwnPropertyNames(data).length;
    for(let i = 0 ; i < this.ArrayLength ; i ++){
      this.newData.push(this.cryptoData[0][this.keys[i]])
    }
    console.log(this.newData)
    })
  }
  findNegativeString(stirng : string) { 
    if (stirng.toString().indexOf('-') !== -1) {
      return 'market-coins-coin-change market-coins-coin-change-neg'
    }else{
      return 'market-coins-coin-change'
    }
  }
}
