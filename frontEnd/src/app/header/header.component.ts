import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {faSignOutAlt ,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {TokenServiceService} from '../token-service.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private library: FaIconLibrary , private tokenService : TokenServiceService) { 
    library.addIcons(faSignOutAlt , faInfoCircle)
  }

  ngOnInit(): void {
  }
  logout(){
    this.tokenService.clearUserToken()
    window.location.reload()
  }
}
