import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  userForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.email, Validators.required]],
     address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
        });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
    return;
    }
    if (control.value !== matchingControl.value) {
    matchingControl.setErrors({ mustMatch: true });
    } else {
    matchingControl.setErrors(null);
    }
    }
    }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  submit(){
    console.log(this.userForm.value);
    this.http.post('http://localhost:3000/add/user', this.userForm.value)
      .subscribe((res: any) => {
        console.log(res.Message);
        alert('Uploaded Successfully.');
      })
    }
  }
