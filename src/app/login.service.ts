import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedin$ = new BehaviorSubject(false);
  token: string = '';
  username: string = '';

  constructor(private http: HttpClient,  private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  logIn(username: string, password: string){

    this.http.post<{message: string, token: string, username: string;}>('http://localhost:3000/login', {password: password, username: username}, this.httpOptions)
        .subscribe((responseData) => {
          console.log(responseData);
          if(responseData.message == "Login from express.js"){

            this.loggedin$.next(true);
            this.token = responseData.token;
            this.username = responseData.username;
            this.router.navigate(['tracking']);
          } 
    });    
  }

  logOut(){

    this.http.post<{message: string;}>('http://localhost:3000/logout', {token: this.token}, this.httpOptions)
        .subscribe((responseData) => {
          console.log(responseData.message);
          if(responseData.message == "logout"){
            this.loggedin$.next(false);
            this.token = '';
            this.username = '';
            this.router.navigate(['login']);
          } 
    });  
  }

  getToken(){
    return this.token;
  }

  getUsername(){
    return this.username;
  }

  getLogginStatus(): boolean{
    return this.loggedin$.getValue();
  }

}
