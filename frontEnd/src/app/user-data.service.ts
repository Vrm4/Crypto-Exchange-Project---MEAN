import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './interfaces/User'

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  User: Array<any> | undefined;

  userSession: any;
  public readonly users$: Observable<User[]>;

  private readonly _usersSubject$: BehaviorSubject<User[]>;
  

  constructor() {
    this._usersSubject$ = new BehaviorSubject<User[]>([]);
    this.users$ = this._usersSubject$.asObservable();
    
  }

  public set saveUserData(data: User[]) {
    this._usersSubject$.next(data);
    this.userSession = sessionStorage.setItem('userData', JSON.stringify(data))
  }
  
}
