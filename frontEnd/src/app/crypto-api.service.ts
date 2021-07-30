import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { HttpClient ,HttpHeaders,HttpErrorResponse } from '@angular/common/http'



const httpOptions = { 
    headers : new HttpHeaders ({
      'Content-Type':  'application/json'
    })
}


@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {

  private apiUrl = environment.apiUrl

  constructor(private http : HttpClient) { }


  CryptoAPI() : Observable<any> {
    return this.http.get(this.apiUrl + 'cryptocurrencies').pipe(catchError(this.errorHandler))
  }
  register(data : any) : Observable<any> { 
    return this.http.post<any>(this.apiUrl + 'register' , data , httpOptions).pipe(catchError(this.errorHandler))
  }
  login(data :any) : Observable<any>{
    return this.http.post<any>(this.apiUrl + 'login' , data, httpOptions).pipe(catchError(this.errorHandler))
  }
  buyCoin(data : any) : Observable<any> {
    return this.http.post<any>(this.apiUrl + 'buy-coin', data , httpOptions).pipe(catchError(this.errorHandler))
  }
  sellCoin(data : any) : Observable<any>{
    return this.http.post<any>(this.apiUrl + 'sell-coin' , data , httpOptions).pipe(catchError(this.errorHandler))
  }
  updateBlance(data : any , id : string) : Observable<any> { 
    return this.http.put<any>(this.apiUrl + `update-blance/${id}` , data , httpOptions).pipe(catchError(this.errorHandler))
  }
  buyHistory() : Observable<any>{
    return this.http.get(this.apiUrl + 'order-history').pipe(catchError(this.errorHandler))
  }
  refreshUserData (id : any ): Observable<any> { 
    return this.http.post<any>(this.apiUrl + 'refresh-data', id ,httpOptions).pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }

}
