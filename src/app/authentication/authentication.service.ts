import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  API_URL = 'http://localhost:8000/user';


  constructor( private http: HttpClient ) { }

  login(credentials){
    return this.http.post(`${this.API_URL}/login`, credentials)
  }
}