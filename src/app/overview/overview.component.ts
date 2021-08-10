import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  userData: any = [];
  trackingData: any = [];
  displayedColumns = ['position', 'room', 'date', 'start', 'end'];
  loggedin = false;

  constructor(private http: HttpClient, private loginService: LoginService) { 
    this.loginService.loggedin$.subscribe(x => this.loggedin = x);
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){ 
    this.http.get<{message: string, userProfileData: Object, userTrackingData: Object;}>('http://localhost:3000/overview?token=' + this.loginService.getToken() +'&username=' + this.loginService.getUsername(), {'responseType':'json'})
        .subscribe((responseData) => {
          this.userData = responseData.userProfileData;
          this.trackingData = responseData.userTrackingData;
        });    
  }
  
}
