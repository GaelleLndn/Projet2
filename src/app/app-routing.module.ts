import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { LogListComponent } from './logs/log-list/log-list.component';
import { LogCreateComponent } from './logs/log-create/log-create.component';

import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';

import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HomeListComponent } from './home/home-list/home-list.component';

import { SearchComponent } from './search/search/search.component'



const routes: Routes = [
  { path: '', pathMatch: 'full', component: LogCreateComponent }, 
  { path: 'search', component: SearchComponent},
  { path: 'create', component: HomeCreateComponent},
  { path: 'create/log', component: LogCreateComponent},
  { path: 'create/category', component: CategoryCreateComponent},
  { path: 'edit/log/:logId', component: LogCreateComponent}, 
  { path: 'edit/category/:categoryId', component: CategoryCreateComponent},
  { path: 'list', component: HomeListComponent},
  { path: 'list/logs', component: LogListComponent}, 
  { path: 'list/categories', component: CategoryListComponent}, 

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
