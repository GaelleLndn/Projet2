import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { Category } from './category.model';


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient, private router: Router) { }

  API_URL = 'http://localhost:8000';
  private categories: Category [] = [];
  categoriesUpdated = new Subject<Category[]>()

  getCategories(){
    return this.http.get(`${this.API_URL}/categories`).pipe(
      map( (categoryData: any) => {
        return categoryData.categories.map (category => {
          return {
            _id: category._id,
            label: category.label,
            logs: category.logs, 
            creator: category.creator
          }
        })
      })
    )
    .subscribe( transformedCategories => {
      this.categories = transformedCategories;
      this.categoriesUpdated.next([...this.categories])
    })
  };

  getCategoryUpdateListener(){
    return this.categoriesUpdated.asObservable();
  }



  getCategoryById(categoryId: string){
    return this.http.get(`${this.API_URL}/categories/${categoryId}`).pipe(
      map((categoryData :any) => {
        return categoryData.category
      })
    )  
  }

  getCategoryByLabel(catLabel: string){
    console.log('getCategoryByLabel', catLabel)
    return this.http.get(`${this.API_URL}/categories/label/${catLabel}`).pipe(
      map((categoryData :any) => {
        return categoryData.category
      })
    )  
  }



  addCategory(categoryData){
    const category: Category = {
      _id: categoryData._id,
      label: categoryData.label,
      logs: categoryData.logs,
      creator: categoryData.creator
    } ;
    this.http.post<{message: string, categoryId: string}>(`${this.API_URL}/categories`, category)
      .subscribe((responseData) => {
        const _id = responseData.categoryId;
        category._id = _id;
        this.categories.push(category)
        this.categoriesUpdated.next([...this.categories]);
        this.router.navigate(["/list"])
      });  
  }

  updateCategory(categoryData){
    const category: Category = {
      _id: categoryData._id,
      label: categoryData.label,
      logs: categoryData.logs,
      creator: categoryData.creator
    } ;
    this.http.patch(`${this.API_URL}/categories/${categoryData._id}`, category)
    .subscribe(response => {
      this.categories.push(category);
      this.categoriesUpdated.next([...this.categories]);
      this.router.navigate(["/list"])
    });

  }

  deleteCategory(categoryId: String){
    this.http.delete(`${this.API_URL}/categories/${categoryId}` )
      .subscribe(()=> {
        const updatedCategories = this.categories.filter(category => category._id !== categoryId);
        this.categories = updatedCategories;
        this.categoriesUpdated.next([...this.categories])
      })
  }

}
