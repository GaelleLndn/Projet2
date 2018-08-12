import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import  { CategoriesService } from '../categories.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit , OnDestroy {

  categories: Category[] =[];
  categoriesSub : Subscription;
  isLoading = false

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit() {
    this.isLoading = true
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoryUpdateListener()
      .subscribe(
        (categories: Category[]) => {
          this.isLoading = false
          this.categories = categories.sort((a, b) => a.label.localeCompare(b.label))

        }
      )
  }

  onDeleteCategory(postId: String){
    this.categoriesService.deleteCategory(postId)
  }

// remove subcription / unsubscribe after compoenent is destroyed (is not in the DOM anymore) and prevent memory leaks
  ngOnDestroy(){
    this.categoriesSub.unsubscribe();
  }

}
