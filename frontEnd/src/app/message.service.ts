import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  Messages : String[] = []
  MessagesNegative : String[] = []
  addMessages(message : string ){
    this.Messages.push(message)
    setTimeout(() => {
      this.clearMessage()
    }, 3000);
  }
  addNegativeMessages(message : string ){
    this.MessagesNegative.push(message)
    setTimeout(() => {
      this.clearMessage()
    }, 3000);
  }
  clearMessage(){
    this.Messages = []
    this.MessagesNegative = []
  }

  constructor() { }
}
