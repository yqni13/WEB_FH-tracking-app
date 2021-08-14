import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  loggedin = false;
  chosenTime: any;
  chosenTimeEnd: string = "";
  timeInNumber: any;

  hours: any;
  minutes: any;
  seconds: any;

  hoursString: string = "";
  minutesString: string = "";
  secondsString: string = "";

  regExTime = /([0-9]?[0-9]):([0-9][0-9]):([0-9][0-9])/;
  regExTimeArr: any;

  date: string = "";
  year: any;
  month: any;
  day: any;

  maxDate = new Date();

  trackingForm: FormGroup = new FormGroup({});

  rooms = ["Aula_A0.03", "BR_B0.02", "BR_E0.20", "BR_F3.08", "BR_F6.20", "BR_F7.04", "BR_F7.35", "Bro_B1.09", "Bro_B5.05", "Bro_B5.07", "Bro_F6.04", "EDV_A2.06", "EDV_A2.07", "EDV_A5.08", "EDV_5.09", "EDV_A5.10", "EDV_A6.08", "EDV_E0.11", "EDV_E0.12", "EDV_E1.03", "EDV_E1.05", "EDV_E1.07", "EDV_F1.01", "EDV_F1.02", "EDV_F1.03", "EDV_F2.02", "EDV_F4.23", "EDV_F4.24", "EDV_F4.25", "EDV_F4.26", "HS_A1.04A", "HS_A1.04B", "HS_A1.05", "HS_A3.13", "HS_A3.14", "HS_A3.15", "HS_E0.14", "HS_E0.15", "HS_E0.24TB", "HS_E1.04", "HS_F0.01", "HS_F0.02", "HS_F2.01", "HS_F2.03", "HS_F4.01", "HS_4.02", "HS_F4.03", "HS_F4.06", "HS_F4.07", "HS_4.08", "HS_F4.22", "WEBINAR40"];

  constructor(private fb: FormBuilder, private http: HttpClient, private loginService: LoginService) {
    this.loginService.loggedin$.subscribe(x => this.loggedin = x);
    this.trackingForm = fb.group({
      roomInput: ['', [Validators.required]],
      dateInput: ['', [Validators.required]],
      timeInput: ['', [Validators.required]]
    });
    
  }
  
  
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  
  
  ngOnInit(): void {
    document.getElementById("button_checkout")!.style.visibility = "hidden";
  }
  
  // reset input fields after posting tracking data
  clearInput() {
    this.trackingForm.reset();
    this.trackingForm.controls["roomInput"].setErrors(null);
    this.trackingForm.controls["dateInput"].setErrors(null);
    this.trackingForm.controls["timeInput"].setErrors(null);
  }

  // first step is to submit starting data
  OnSubmit() {
    
    if (this.trackingForm.value.roomInput && this.trackingForm.value.dateInput && this.trackingForm.value.timeInput) {
      this.chosenTime = this.trackingForm.value.timeInput;
      this.timeInNumber = new Date(Date.now()).getTime();    //milliseconds from 1.1.1970
      this.regExTimeArr = this.regExTime.exec(this.chosenTime);
      document.getElementById("tracking_form")!.style.visibility = "hidden";
      document.getElementById("button_checkout")!.style.visibility = "visible";
    }
    console.log(this.regExTimeArr);
  }
  
  // second step is to calculate and format data before posting to db
  postTracking() {
  
    //time
    this.timeInNumber = new Date(Date.now()).getTime() - this.timeInNumber;   // total time difference in milliseconds
  
    // prepare hours
    this.hours = parseInt(this.regExTimeArr[1]) + Math.floor(this.timeInNumber/3600/1000);
    
    // prepare minutes
    if (parseInt(this.regExTimeArr[2]) + Math.floor(this.timeInNumber/60/1000) >= 60) {
      let temp = (parseInt(this.regExTimeArr[2]) + Math.floor(this.timeInNumber/60/1000)) - 60;
      this.minutes = temp;
      if (this.hours == 23) {
        this.hours = 0;
      } else {
        ++this.hours;
      }
    } else {
      this.minutes = parseInt(this.regExTimeArr[2]) + Math.floor(this.timeInNumber/60/1000);
    }
    
    // prepare seconds
    if (parseInt(this.regExTimeArr[3]) + Math.floor(this.timeInNumber/1000) >= 60) {
      let temp = (parseInt(this.regExTimeArr[3]) + Math.floor(this.timeInNumber/1000)) - 60;
      this.seconds = temp;
      if (this.minutes == 59) {
        this.minutes = 0;
        if (this.hours == 23) {
          this.hours = 0;
        } else {
          ++this.hours;
        }
      } else {
        ++this.minutes;
      }
    } else {
      this.seconds = parseInt(this.regExTimeArr[3]) + Math.floor(this.timeInNumber/1000);
    }
  
    // convert to string
    if (this.hours < 10) {
      this.hours = "0" + this.hours;
    }
    if (this.minutes < 10) {
      this.minutes = "0" + this.minutes;
    }
    if (this.seconds < 10) {
      this.seconds = "0" + this.seconds;
    }
    this.timeInNumber = Math.floor(this.timeInNumber/1000); // round number down to only get seconds
    this.chosenTimeEnd = this.hours + ":" + this.minutes + ":" + this.seconds;
    
    // preapare date
    this.year = this.trackingForm.value.dateInput.getFullYear();
    this.month = this.trackingForm.value.dateInput.getMonth()+1;
    if (this.month < 10) {
      this.month = "0"+this.month;
    }
    this.day = this.trackingForm.value.dateInput.getDate();
    if (this.day < 10) {
      this.day = "0"+this.day;
    }
    this.date = this.day + "." + this.month + "." + this.year;
  
    // post tracking data to db
    this.http.post<{message: 'string'}>('http://localhost:3000/tracking', {room: this.trackingForm.value.roomInput, date: this.date, begin: this.chosenTime, end: this.chosenTimeEnd, timeInSeconds: this.timeInNumber, username: this.loginService.getUsername(), token: this.loginService.getToken()}, this.httpOptions)
      .subscribe({
        next: (responseData) => {
        console.log(responseData.message);
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
    document.getElementById("tracking_form")!.style.visibility = "visible";
    document.getElementById("button_checkout")!.style.visibility = "hidden";
  }
}


