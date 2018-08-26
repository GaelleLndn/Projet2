import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


import { CategoriesService } from '../categories.service'
import { Category } from '../category.model'

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {


  categories: Category[] =[];
  category: Category;
  catLabel: string;
  isLoading = false

  constructor(public categoriesService: CategoriesService,  public route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap )=> {
        this.catLabel = paramMap.get('catLabel');
        console.log('getCategoryByLabel', this.catLabel)
        this.isLoading = true

        this.categoriesService.getCategoryByLabel(this.catLabel)
          .subscribe ( 
            (category: Category) =>  {
              this.category = category;
              console.log('CAT', this.category)
              this.isLoading = false;
            }
          );
    });
  }

  goBack(){
    this.location.back()
  }




}
