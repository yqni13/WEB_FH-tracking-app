import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }
  
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  hide = true;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginService.logIn(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
  }
  
}
