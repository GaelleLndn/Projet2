import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

import { Log } from '../../logs/log.model';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  logs: Log[] = [];

  constructor(private searchService: SearchService ) { }

  ngOnInit() {
  }

  searchLogs(searchData){
    this.searchService.searchLogs(searchData)
      .subscribe(
          (logs: Log[]) => {
            this.logs = logs,
            console.log(this.logs)
          },
          error => console.log(error)
      )
  }
}
