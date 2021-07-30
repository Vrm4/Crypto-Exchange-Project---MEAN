import { Injectable } from '@angular/core';

const userKey = 'try'

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor() { }
  getUserToken(key : string) {
    return sessionStorage.getItem(key);
  }

  saveUserToken(data : any) :void {
    sessionStorage.setItem('loginDatas',data)
  }
  saveDateToken() { 
    sessionStorage.setItem('getDate' , new Date().toLocaleDateString())
  }
  clearUserToken() {
    sessionStorage.clear()
  }
  updateToken(value : any){
    let Data = JSON.parse(sessionStorage.getItem('userData')  || '[]');
    Object.keys(value).forEach((val, key) =>{
      Data[0][val] = value[val];
    })
    sessionStorage.setItem('userData', JSON.stringify(Data));
}
}
