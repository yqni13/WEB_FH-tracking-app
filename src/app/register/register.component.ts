import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { ConfirmPasswordValidator } from '../confirmPassword.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  hide = true;
  message: string = "You have successfully signed up =>";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  registerForm: UntypedFormGroup = new UntypedFormGroup({});
  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) { 
    this.registerForm = fb.group({
      username: ['', [Validators.required]],
      password_origin: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]]
    }, {
      validator: ConfirmPasswordValidator('password_origin', 'password_confirm')
    })
  }

  get f() {
    return this.registerForm.controls;
  }

  // resets registration form (no data, no validation errors until reload)
  clearInput() {
    this.registerForm.reset();
    this.registerForm.controls["username"].setErrors(null);
    this.registerForm.controls["password_origin"].setErrors(null);
    this.registerForm.controls["password_confirm"].setErrors(null);
    this.registerForm.controls["email"].setErrors(null);
    this.registerForm.controls["firstname"].setErrors(null);
    this.registerForm.controls["lastname"].setErrors(null);
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if(this.registerForm.value.username && this.registerForm.value.firstname && this.registerForm.value.lastname && this.registerForm.value.email && this.registerForm.value.password_origin && this.registerForm.value.password_confirm) { 
      this.http.post<{ message: 'string' }>('http://localhost:3000/register', { "username": this.registerForm.value.username, "firstname": this.registerForm.value.firstname, "lastname": this.registerForm.value.lastname, "email": this.registerForm.value.email, "password": this.registerForm.value.password_confirm }, this.httpOptions).subscribe ({
        next: (responseData) => {
          console.log(responseData.message);
          this._snackBar.open(this.message, 'go to LOGIN!', { duration: 3000 });
          this.clearInput();
        },
        error: (err) => {
          console.log(err.error.message);
        }
      });
    }
  }

}
