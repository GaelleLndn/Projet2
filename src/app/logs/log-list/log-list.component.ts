import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import  { LogsService } from '../logs.service'
import { Log } from '../log.model'

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, OnDestroy{


  logs: Log[] =[];
  logsSub : Subscription;
  isLoading = false


  constructor(public logsService: LogsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.logsService.getLogs();
    this.logsSub = this.logsService.getLogUpdateListener()
      .subscribe(
        (logs: Log[]) => {
          this.isLoading = false
          this.logs = logs;
        }
      )
  }

  onDeleteLog(logId: String){
    this.logsService.deleteLog(logId)
  }

  // remove subcription / unsubscribe after compoenent is destroyed (is not in the DOM anymore) and prevent memory leaks
  ngOnDestroy(){
    this.logsSub.unsubscribe();
  }

}
