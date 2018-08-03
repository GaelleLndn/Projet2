import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';


const routes: Routes = [
  { path: '', component: PostCreateComponent }, 
  { path: 'create', component: PostCreateComponent},
  { path: 'list', component: PostListComponent}, 
  { path: 'edit/:postId', component: PostCreateComponent}, 
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