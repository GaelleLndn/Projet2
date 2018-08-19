import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer:  any;
  private userId: any;
  private authStatusListener = new Subject<boolean>();
  API_URL = 'http://localhost:8000/user';


  constructor( private http: HttpClient, private router: Router  ) { }

  getToken() {
    return this.token
  }

  getUserId(){
    return this.userId
  }

  getIsAuth(){
    return this.isAuthenticated
  };

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(`${this.API_URL}/signup`, authData)
      .subscribe(
        () => { 
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.router.navigate(['/create'])
        },
        error => { 
          this.authStatusListener.next(false)

        }
    );
  }

  login(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    return this.http.post<{token: string, expiresIn: number, userId: any}>(`${this.API_URL}/login`, authData)
    .subscribe(response => {
      const token = response.token
      this.token = token;
      if (token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration)
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        console.log('expirationDate', expirationDate)
        this.router.navigate(['/create'])
      }
    })
  };

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if (!authInformation){
      return
    }
    const now = new Date;
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true);
    }
  };

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData(); 
    this.userId = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration : number){
    console.log('setting Timer', duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);

  }

  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('uderId', userId)
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('uderId')
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date (expirationDate), 
      userId: userId
    } 
  };


}