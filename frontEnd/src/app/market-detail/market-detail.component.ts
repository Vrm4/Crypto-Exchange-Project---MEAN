import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChartLine , faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { CryptoApiService } from '../crypto-api.service';
import { TokenServiceService } from '../token-service.service';
import { MessageService } from '../message.service';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { Orders } from '../interfaces/Orders';
@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.css']
})
export class MarketDetailComponent implements OnInit {
  newSessionData : any[] = []
  coinQuantityInput : any | undefined;
  coinUsdtInput : any | undefined;
  params : string | undefined
  keys : string | any 
  ArrayLength : number | undefined
  marketDetailData : any[] = []
  marketDetailDataReq : any[] = []
  orderForm : any;
  indexNumber : Number | undefined
  filterMethod : any;
  orderDataFalse : Orders[] = []
  orderDataTrue : Orders[] = []
  constructor(private library: FaIconLibrary , private route: ActivatedRoute,private cryptoAPI :CryptoApiService , private fb : FormBuilder , public  tokerService : TokenServiceService , private messageService : MessageService , private userService : UserDataService , private router : Router) {
    library.addIcons(faChartLine,faEllipsisV)
   }
   userData : any = JSON.parse(sessionStorage.getItem('userData') || '[]')
  ngOnInit(): void {
    if (!this.tokerService.getUserToken('loginDatas')) {
      this.router.navigateByUrl('/login');
    }
    // get params name 
    this.params = this.route.snapshot.params.name
    // get order data 
    this.cryptoAPI.buyHistory().subscribe(data => { 
      this.orderDataFalse = data.orderData.filter((element:any) =>{
        return element.order === false && element.name === this.params?.toUpperCase()
       }); 
       this.orderDataTrue = data.orderData.filter((element:any) =>{
        return element.order === true && element.name === this.params?.toUpperCase()
       }); 
    })


    this.orderForm = this.fb.group({
      coinPrice : [''],
      coinQuantity : [''],
      coinUsdt : ['']
    })

    // handle my data of my coin 
    this.filterMethod = this.userData[0].coins.filter((element: any ) =>{
      return element.coin === this.params?.toLocaleUpperCase()
    })

    // if value of input changed calculate new result
    this.orderForm.controls.coinUsdt.valueChanges.subscribe(
      (data: any) => {
        if(this.orderForm.controls.coinUsdt.value != undefined){
          const lastQuantity = data / this.marketDetailDataReq[0].quote.USD.price
          this.orderForm.controls.coinQuantity.setValue(lastQuantity.toFixed(2))
        }
        
      }
      )

    
    // get coin api from coinmarket.com
    this.cryptoAPI.CryptoAPI().subscribe(data => {
      this.keys = Object.keys(data)
      this.ArrayLength = Object.getOwnPropertyNames(data).length;
      for(let i = 0 ; i < this.ArrayLength ; i ++){
        this.marketDetailData.push(data[this.keys[i]])
        if(this.marketDetailData[i].symbol === this.params?.toUpperCase()){
          this.marketDetailDataReq.push(data[this.keys[i]])
          this.orderForm.controls.coinPrice.setValue(this.marketDetailDataReq[0].quote.USD.price.toFixed(2))
        }
      }
      this.newSessionData.push(this.userData[0].coins)
       console.log(this.newSessionData) 
      }
    )
  }
  onSubmit(){
    // last blance 
    const lastBlance = this.userData[0].blance - this.orderForm.controls.coinUsdt.value
    
    if(lastBlance < 0 || lastBlance === 0){
      this.messageService.addNegativeMessages('You have not blance!')
    }else{
      // send data to server for add order  
      const submitData = {
        submitValue : this.orderForm.value,
        userId : this.userData[0]._id,
        order : true,
        data : `${new Date().toLocaleDateString("en-US")}`,
        name : this.marketDetailDataReq[0].symbol
      }
      // buy coin
      this.cryptoAPI.buyCoin(submitData).subscribe((data) =>{
        //message service 
        this.messageService.addMessages('Buyed!')
        this.cryptoAPI.updateBlance({blance : lastBlance},this.userData[0]._id).subscribe(data => {
          // refresh data for new session data
          this.cryptoAPI.refreshUserData({UserId1 : this.userData[0]._id}).subscribe(result => this.userService.saveUserData = result.userData)
        })
  
        
      },err => this.messageService.addNegativeMessages("There's Have Problem!"))
    }

  }
  SellonSubmit(){
    // last blance 
   const lastBlanceSell = Number(this.userData[0].blance) + Number(this.orderForm.controls.coinUsdt.value)
   
   const controlArray = this.userData[0].coins
   const controlCoin = controlArray.filter((result: { coin: any; }) => result.coin === this.marketDetailDataReq[0].symbol)
   if(!controlCoin.length){
     this.messageService.addNegativeMessages('You have not that coin!!!')
   }else{
    const submitDataSell = {
      submitValue : this.orderForm.value,
      userId : this.userData[0]._id,
      order : false,
      data : `${new Date().toLocaleDateString("en-US")}`,
      name : this.marketDetailDataReq[0].symbol
    }
    // sell coin 
    this.cryptoAPI.sellCoin(submitDataSell).subscribe(data => {
      // message service 
      this.messageService.addMessages('Sold!');
      console.log(lastBlanceSell)
      // update blance from data base 
      this.cryptoAPI.updateBlance({blance : lastBlanceSell.toFixed(2)},this.userData[0]._id).subscribe(data => {
        // refresh data for new session data
        this.cryptoAPI.refreshUserData({UserId1 : this.userData[0]._id}).subscribe(result => this.userService.saveUserData = result.userData)
      })
      
      

    } , err => this.messageService.addNegativeMessages("There's Have Problem!"))

   }
  }
  //percent calculates

  percent1(){
    const money = this.userData[0].blance
    const result = (money * 25) / 100;
    const quantity = result / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(result.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  percent2(){
    const money = this.userData[0].blance
    const result = (money * 50) / 100
    const quantity = result / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(result.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  percent3(){
    const money = this.userData[0].blance
    const result = (money * 75) / 100
    const quantity = result / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(result.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  percent4(){
    const money = this.userData[0].blance
    const quantity = money / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(money.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  // sell 
  percent1Sell(){
    const money = this.filterMethod[0].coinUsdt
    const result = (money * 25) / 100;
    const quantity = result / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(result.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  percent2Sell(){
    const money = this.filterMethod[0].coinUsdt
    const result = (money * 50) / 100
    const quantity = result / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(result.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  percent3Sell(){
    const money = this.filterMethod[0].coinUsdt
    const result = (money * 75) / 100
    const quantity = result / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(result.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  percent4Sell(){
    const money = this.filterMethod[0].coinUsdt
    const quantity = money / this.marketDetailDataReq[0].quote.USD.price.toFixed(2)
    this.orderForm.controls.coinUsdt.setValue(money.toFixed(2))
    this.orderForm.controls.coinQuantity.setValue(quantity.toFixed(2))
  }
  // show sell and buy inputs 
  sellInputs(){
    (document.getElementById('sell-group') as HTMLElement).style.display = 'block';
    (document.querySelector('.markets-form-group') as HTMLElement).style.display = 'none'
  }
  buyInputs(){
    (document.getElementById('sell-group') as HTMLElement).style.display = 'none';
    (document.querySelector('.markets-form-group') as HTMLElement).style.display = 'block'
  }
}
