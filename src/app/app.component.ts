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
  themeCounter = 0;

  constructor(private loginService: LoginService) {
    this.loginService.loggedin$.subscribe(x => this.loggedin = x);
  }
  
  loggout(){    
    this.loginService.logOut();
  }
  colorTheme() {
    ++this.themeCounter;

    if (this.themeCounter%2 == 1) {
      
      // change to darkmode    
      document.body.style.background = "var(--darkmode)";
      document.getElementsByTagName('h1')[0].style.color = "var(--logoyellow)";
      document.getElementById('toggle_theme')!.style.color = "var(--logoyellow)";

    } else {
      
      // change to lightmode
      document.body.style.background = "var(--lightmode)";
      document.getElementsByTagName('h1')[0].style.color = "var(--buttonback)";
      document.getElementById('toggle_theme')!.style.color = "var(--buttonback)";
    }

  }
  
  ngOnInit() {
  }
}
