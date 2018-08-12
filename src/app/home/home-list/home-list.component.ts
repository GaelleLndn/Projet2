import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit , OnDestroy{

  authListenerSubs: Subscription
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
