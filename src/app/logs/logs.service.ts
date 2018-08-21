import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { Log } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient, private router: Router) { }

  API_URL = 'http://localhost:8000';
  private logs: Log [] = [];
  logsUpdated = new Subject<Log[]>()

  getLogs(){
    return this.http.get(`${this.API_URL}/logs`).pipe(
      map( (logData: any) => {
        return logData.logs.map (log => {
          return {
            _id: log._id,
            title: log.title,
            date: log.date,
            categories: log.categories,
            creator: log.creator
          }
        })
      })
    )
    .subscribe( transformedLog => {
      this.logs = transformedLog;
      this.logsUpdated.next([...this.logs]);
    });
  };

  getLogUpdateListener(){
    return this.logsUpdated.asObservable();
  }

  getLogById(logId){
    return this.http.get(`${this.API_URL}/logs/${logId}`).pipe(
      map((logData :any) => {
        return logData.log
      })
    )    
  };

  addLog(logData){ 
    const log: Log = {
    _id: logData._id,
    title: logData.title,
    date: logData.date,
    categories: logData.categories, 
    creator: logData.creator
  } ;
  this.http.post<{message: string, logId: string}>(`${this.API_URL}/logs`, log)
    .subscribe((responseData) => {
      const _id = responseData.logId;
      log._id = _id;
      this.logs.push(log)
      this.logsUpdated.next([...this.logs]);
      this.router.navigate(["/list"]);
    });
  }

  updateLog(logData){
    const log: Log = {
      _id: logData._id,
      title: logData.title,
      date: logData.date,
      categories: logData.categories,
      creator: logData.creator
    } ;
    this.http.patch(`${this.API_URL}/logs/${logData._id}`, log)
      .subscribe(response => {
        this.logs.push(log);
        this.logsUpdated.next([...this.logs]);
        this.router.navigate(["/list"])
      });
  }

  deleteLog(logId: String){
    this.http.delete(`${this.API_URL}/logs/${logId}` )
      .subscribe(()=> {
        const updatedLogs = this.logs.filter(log => log._id !== logId);
        this.logs = updatedLogs;
        this.logsUpdated.next([...this.logs])
      })
  }

  
}
