import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router'

import { LogCreateComponent } from './logs/log-create/log-create.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';

import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HomeListComponent } from './home/home-list/home-list.component';

import { SearchComponent } from './search/search/search.component';

import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

import { AuthGuard } from './authentication/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'create', component: HomeCreateComponent},
  { path: 'list', component: HomeListComponent},
  { path: 'edit/log/:logId', component: LogCreateComponent, canActivate: [AuthGuard]}, 
  { path: 'edit/category/:categoryId', component: CategoryCreateComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent},

  { path: '', pathMatch: 'full', component: LoginComponent, canActivate: [AuthGuard] },
  //{ path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] } 

]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes) 
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ],
  declarations: []
})
export class AppRoutingModule { }
