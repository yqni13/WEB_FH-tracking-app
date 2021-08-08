import { Component } from '@angular/core';

import {LoginService} from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fh-tracking-app';
  loggedin: boolean= false;

  constructor(private loginService: LoginService) {
    this.loginService.loggedin$.subscribe(x => this.loggedin = x);
  }

  loggout(){    
    this.loginService.logOut();
  }
}
