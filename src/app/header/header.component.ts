import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  authListenerSubs: Subscription
  userIsAuthenticated = false

  constructor( private authService: AuthService) { }

  ngOnInit() { 
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(
        (isAuthenticated) => {
          this.userIsAuthenticated = isAuthenticated,
          console.log('USER AUTH DAND HEADER COMPOENENT INSIDE', this.userIsAuthenticated)

        }
      )
    console.log('USER AUTH DAND HEADER COMPOENENT', this.userIsAuthenticated)

  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

}
