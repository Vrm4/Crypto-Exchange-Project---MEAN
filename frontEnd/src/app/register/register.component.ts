import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CryptoApiService } from '../crypto-api.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any ;
  constructor( private fb : FormBuilder ,private ApiService : CryptoApiService , private messageService : MessageService , private router : Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      userName : [''],
      name : [''],
      eMail : [''],
      pass: ['']
    })
  }
  onSubmit() {
    this.ApiService.register(this.registerForm.value).subscribe(result => {
      //message service 
      this.messageService.addMessages('Successful'); 
      //go login page after 2 minute
      setTimeout(() => {this.router.navigateByUrl('/login');}, 3000);
    }, 
    err =>{
      //message service 
      this.messageService.addNegativeMessages('Register Not Successful')
    }
    )
  }
}
