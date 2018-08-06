import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { LogListComponent } from './logs/log-list/log-list.component';
import { LogCreateComponent } from './logs/log-create/log-create.component';

import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', component: LogCreateComponent }, 
  { path: 'create/log', component: LogCreateComponent},
  { path: 'list/logs', component: LogListComponent}, 
  { path: 'edit/log/:logId', component: LogCreateComponent}, 
  { path: 'create/category', component: CategoryCreateComponent},
  { path: 'list/categories', component: CategoryListComponent}, 
  { path: 'edit/category/:categoryId', component: CategoryCreateComponent}

]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes) 
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
