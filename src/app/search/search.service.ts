import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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

  searchResult = [];
  searchResultSubject = new Subject();

  constructor(private http: HttpClient) { }

  textSearch(criteria){
    console.log('******* CRITERIA ********', criteria)
    return this.http.get(`${this.API_URL}/search/${criteria.term}`).pipe(
      map( ( searchData:any ) => {
        const searchDataLog = searchData.logs
        const searchDataCat = searchData.categories
        
        return {
          resultLog: searchDataLog.map ( sdLog => {
            return {
              title: sdLog.title,
              date: sdLog.date,
              categories: sdLog.categories
            }
          }),
          resultCat: searchDataCat.map ( sdCat => {
            return {
              label: sdCat.label,
              logs: sdCat.logs,
            }
          })
        }
      })
    )
    .subscribe ( transformedResult => {
      this.searchResultSubject.next({...transformedResult});
    })
  }

        // this.searchData = data;
        // this.searchResultSubject.next([this.searchData])
        // console.log ('dans SERVICE GetLog/apres subscribe', this.searchData)




}