import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { Log } from '../logs/log.model';
import { Category } from '../categories/category.model';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  API_URL = 'http://localhost:8000';
  private logs: Log [] = [];
  logsUpdated = new Subject<Log[]>()

  constructor(private http: HttpClient, private router: Router) { }

  searchLogs(criteria){
    console.log('******* CRITERIA ********', criteria)
    return this.http.get(`${this.API_URL}/search/${criteria.term}`).pipe(
      map( (logData: any) => {
        return logData.logs.map (log => {
          return {
            _id: log._id,
            title: log.title,
            date: log.date,
            categories: log.categories
          }
        })
      })
    )

  }
}
