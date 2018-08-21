import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search.service';

import { Log } from '../../logs/log.model';
import { Category } from '../../categories/category.model';



@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  logs: Log[] = [];
  categories : Category[] = [];

  constructor(private searchService: SearchService ) { }

  ngOnInit() {
    console.log('searchform')
  }

  searchAll(searchData){
    this.searchService.textSearch(searchData)
  }
}
