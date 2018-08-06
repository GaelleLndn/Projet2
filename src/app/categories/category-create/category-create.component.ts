import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../categories.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryForm: FormGroup;
  enteredLabel= '';
  private mode = 'create';
  private categoryId: string
  category: Category;
  isLoading = false

  constructor(private formBuilder: FormBuilder, public categoriesService: CategoriesService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      _id : '',
      label : ['', Validators.required]
    })


    this.route.paramMap.subscribe((paramMap )=> {
      if (paramMap.has('categoryId')){
        this.mode = 'edit';
        this.categoryId = paramMap.get('categoryId');
        this.isLoading = true
        this.category = this.categoriesService.getCategoryById(this.categoryId);
        this.isLoading = false
        this.categoryForm.get('label').patchValue(this.category.label);
      } else {
        this.mode = 'create';
        this.categoryId = null
      }
    });
  }

  onSaveCategory(categoryData){  
    this.isLoading = true;
    if (this.mode === 'create'){
      this.categoriesService.addCategory(categoryData);
    } else {
      categoryData._id = this.categoryId
      this.categoriesService.updateCategory(categoryData)
    }
    this.categoryForm.reset()
  } 

}
