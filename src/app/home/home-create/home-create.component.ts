import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.css']
})
export class HomeCreateComponent implements OnInit, OnDestroy{

    authListenerSubs: Subscription // from login
    userIsAuthenticated = false
  
    constructor(private authService: AuthService) { }
  
    ngOnInit() {
      this.userIsAuthenticated = this.authService.getIsAuth()
  
      this.authListenerSubs = this.authService.getAuthStatusListener()
        .subscribe((isAuthenticated) => {
          this.userIsAuthenticated = isAuthenticated
        })
    }
  
    ngOnDestroy(){
      this.authListenerSubs.unsubscribe()
    }
  }  