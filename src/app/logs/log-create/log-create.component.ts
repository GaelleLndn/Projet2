import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LogsService } from '../logs.service';
import { Log } from '../log.model';

import { CategoriesService } from '../../categories/categories.service';
import { Category } from '../../categories/category.model';


@Component({
  selector: 'app-log-create',
  templateUrl: './log-create.component.html',
  styleUrls: ['./log-create.component.css']
})
export class LogCreateComponent implements OnInit {

  logForm: FormGroup;
  today = new Date;

  private mode = 'create';
  private logId: string;

  log: Log;
  categories: Category [] = [];

  error = '';

  isLoading = false


  constructor(
    private formBuilder: FormBuilder,  
    private logsService: LogsService, 
    private categoriesService: CategoriesService, 
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.categoriesService.getCategories();
    this.categoriesService.categoriesUpdated.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );

    this.logForm = this.formBuilder.group({
      _id: [''],
      date: [ this.today, Validators.required],
      title: ['', Validators.required],
      categories: ['', Validators.required ]
    })

    this.route.paramMap.subscribe((paramMap )=> {
      if (paramMap.has('logId')){

        this.mode = 'edit';

        this.logId = paramMap.get('logId');
        this.isLoading = true

        this.logsService.getLogById(this.logId)
          .subscribe ( 
            (log: Log) =>  {
              this.log = log;
              this.isLoading = false;
              this.logForm.get('title').patchValue(this.log.title);
              this.logForm.get('date').patchValue(this.log.date);
              this.logForm.get('categories').patchValue(this.log.categories.map(category => category._id));
            }
          );
      } else {
        this.mode = 'create';
        this.logId = null
      }
    })
  }

  onSaveLog(logData){  
    this.isLoading = true;
    if (this.mode === 'create'){
      this.logsService.addLog(logData);
    } else {
      logData._id = this.logId
      this.logsService.updateLog(logData)
    }
    this.logForm.reset()
  } 
}
