import { Component, OnInit } from '@angular/core';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  resultData

  constructor( private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.searchResultSubject.subscribe(
      data => {
        console.log('DANS NGONINIT DE SEARCH RESULT', data)
        this.resultData = data
      }
    )
  }


}
