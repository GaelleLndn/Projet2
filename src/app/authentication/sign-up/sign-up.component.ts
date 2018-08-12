import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLoading = false;
  
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSignup(signupForm: NgForm){
    if (signupForm.invalid) {
      return
    }  
    this.authService.createUser(signupForm.value.email, signupForm.value.password)
  }

}
