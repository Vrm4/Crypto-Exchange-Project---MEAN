import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {faWallet,faPoll,faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { TokenServiceService } from '../token-service.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/User'
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  show = true;
  userDataComponent: User[] = [];

  constructor(private library: FaIconLibrary , private tokenService :TokenServiceService , private router: Router  ) {
    library.addIcons(faWallet,faPoll,faLongArrowAltUp)
   }

  ngOnInit(): void {
    // get user data from token service 
    this.userDataComponent =JSON.parse(this.tokenService.getUserToken('userData') || '[]')
    // if there's not have a token go login page 
    if (!this.tokenService.getUserToken('loginDatas')) {
      this.router.navigateByUrl('/login');
    }

  }

  logout(){
    this.tokenService.clearUserToken()
    window.location.reload()
  }
}
