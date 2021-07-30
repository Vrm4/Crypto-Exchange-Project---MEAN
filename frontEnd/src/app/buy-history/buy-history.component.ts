import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {faArrowLeft , faHistory } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { CryptoApiService } from '../crypto-api.service';
import { Orders } from '../interfaces/Orders';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.css']
})
export class BuyHistoryComponent implements OnInit {
  OrderHistoryData : Orders[] = []
  userDataComponent : User[] = []
  constructor(private library: FaIconLibrary , private location: Location , private apiServer : CryptoApiService , private tokenService : TokenServiceService , private router : Router) { 
    library.addIcons(faArrowLeft,faHistory)
  }

  ngOnInit(): void {
    this.userDataComponent =JSON.parse(this.tokenService.getUserToken('userData') || '[]')
    // if there's not have a token go login page 
    if (!this.tokenService.getUserToken('loginDatas')) {
      this.router.navigateByUrl('/login');
    }
    // get orders from api service
    this.apiServer.buyHistory().subscribe(data => {
       this.OrderHistoryData = data.orderData.filter((element:any) =>{
        return element.userId === this.userDataComponent[0]._id
       }); 
       
      })
  }
  historyLocation(){
    this.location.back()
  }
}
 