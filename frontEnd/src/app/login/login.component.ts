import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CryptoApiService } from '../crypto-api.service';
import { TokenServiceService } from '../token-service.service';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token : string | undefined;
  loginForm: FormGroup | any;

  constructor( private fb : FormBuilder ,private ApiService : CryptoApiService , private tokenService : TokenServiceService , private userService : UserDataService , private router: Router , private messageService : MessageService) { }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      userName : [''],
      pass: ['']
    })
  }
  onSubmit() {
    this.ApiService.login(this.loginForm.value).subscribe(result => {
      // token 
      this.token = result.loginToken
      // save user token 
      this.tokenService.saveUserToken(this.token)
      // save user data 
      this.userService.saveUserData = result.userData
      //show data of user on console 
      this.userService.users$.subscribe(data => console.log(data))
      //add date 
      this.tokenService.saveDateToken()
      // go wallet
      this.router.navigateByUrl('/wallet');
    }, err => { this.messageService.addNegativeMessages('Login Not Successful')})
  }

}
