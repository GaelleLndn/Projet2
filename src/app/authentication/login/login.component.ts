import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;

  authListenerSubs: Subscription
  userIsAuthenticated = false


  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
  
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated
      })

      if (this.userIsAuthenticated){
        this.router.navigate(['/create'])
      }
  }

  onLogin(loginForm: NgForm){
    if (loginForm.invalid) {
      return;
    }
    this.authService.login(loginForm.value.email, loginForm.value.password)
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }


}

