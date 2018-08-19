import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isLoading = false;
  authStatusSub : Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit() {  
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      (authStatus) => {
        this.isLoading = false;
        console.log ('AUTH STATUS', authStatus)
      });
  }

  onSignup(signupForm: NgForm){
    if (signupForm.invalid) {
      return
    }  
    this.isLoading = true;
    this.authService.createUser(signupForm.value.email, signupForm.value.password);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe()
  }

}
