import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  authListenerSubs: Subscription
  userIsAuthenticated = false

  constructor( private authService: AuthService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() { 
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(
        (isAuthenticated) => {
          this.userIsAuthenticated = isAuthenticated
        }
      )
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

}
