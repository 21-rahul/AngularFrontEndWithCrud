import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserserviceService} from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private userservice : UserserviceService) { }

  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  UserCredentialfalg:string="";
  onSubmit(){
    
    this.userservice.AuthinticateUser(this.loginForm.value).subscribe((data)=>{
      
        this.UserCredentialfalg = data;
        alert("login is successfull");
        this.loginForm.reset();
        this.router.navigate(['employee']);
    },err=>{
      this.UserCredentialfalg=err.error;
      console.log(err)
    })
  }

//signup 

  Signupform = new FormGroup({
    user : new FormControl(''),
    password : new FormControl(''),
    Role: new FormControl('')
  })
  onSubmitSignupForm(){
    this.userservice.signup(this.Signupform.value).subscribe((data)=>{
      alert("New User is created");
      this.Signupform.reset();
      this.router.navigate(['login']);
    },
    (err)=>{
      console.log(err);
    })
  }


}