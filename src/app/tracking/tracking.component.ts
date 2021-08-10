import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  loggedin = false;
  roomData: any;
  dateData: any;
  beginData: any;
  endData: any;

  condition = false;

  rooms = ["Aula_A0.03", "BR_B0.02", "BR_E0.20", "BR_F3.08", "BR_F6.20", "BR_F7.04", "BR_F7.35", "Bro_B1.09", "Bro_B5.05", "Bro_B5.07", "Bro_F6.04", "EDV_A2.06", "EDV_A2.07", "EDV_A5.08", "EDV_5.09", "EDV_A5.10", "EDV_A6.08", "EDV_E0.11", "EDV_E0.12", "EDV_E1.03", "EDV_E1.05", "EDV_E1.07", "EDV_F1.01", "EDV_F1.02", "EDV_F1.03", "EDV_F2.02", "EDV_F4.23", "EDV_F4.24", "EDV_F4.25", "EDV_F4.26", "HS_A1.04A", "HS_A1.04B", "HS_A1.05", "HS_A3.13", "HS_A3.14", "HS_A3.15", "HS_E0.14", "HS_E0.15", "HS_E0.24TB", "HS_E1.04", "HS_F0.01", "HS_F0.02", "HS_F2.01", "HS_F2.03", "HS_F4.01", "HS_4.02", "HS_F4.03", "HS_F4.06", "HS_F4.07", "HS_4.08", "HS_F4.22"];

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.loginService.loggedin$.subscribe(x => this.loggedin = x);
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  ngOnInit(): void {
    if (this.condition) {
      this.postTrackingData(this.roomData, this.dateData, this.beginData, this.endData);
    }
  }

  postTrackingData(roomData: string, dateData: string, beginData: string, endData: string){ 
    this.http.post<{message: string}>('http://localhost:3000/tracking', {room: roomData, date: dateData, begin: beginData, end: endData, username: this.loginService.getUsername(), token: this.loginService.getToken()}, this.httpOptions)
        .subscribe((responseData) => {
          console.log(responseData);
        });    
  }
}
