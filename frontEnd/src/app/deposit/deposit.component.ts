import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CryptoApiService } from '../crypto-api.service';
import { TokenServiceService } from '../token-service.service';
import { MessageService } from '../message.service';
import { User } from '../interfaces/User';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  formBlance : FormGroup | any ; 
  constructor(private library: FaIconLibrary,private location: Location , private fb : FormBuilder , private apiService : CryptoApiService , private tokenService : TokenServiceService , private messageService : MessageService) { 
    library.addIcons(faArrowLeft)
  }
  userData : User[] | any = []
  ngOnInit(): void {
    // get user data from token service 
    this.userData = JSON.parse(this.tokenService.getUserToken('userData') || '[]')
  
    this.formBlance = this.fb.group({
      blance : ['']
    })


  }
  depositLocation(){
    this.location.back()
  }
  onSubmit(){
    // calculate new balance 
    const newBlance = Number(this.formBlance.controls.blance.value)  + Number(this.userData[0].blance)
    // update blance for session 
    this.tokenService.updateToken({blance : newBlance})
    // update blance from database 
    this.apiService.updateBlance({blance : newBlance} , this.userData[0]._id).subscribe(
      data => {
        //message service 
        this.messageService.addMessages('Added!')
        },
        err => {
          //message service
           this.messageService.addNegativeMessages('Error!') 
        }
        )

      }
}
      
    
  

