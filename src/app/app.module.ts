import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// CUSTOM MODULES
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

// LOCALES 
import { MAT_DATE_LOCALE, MatIconRegistry } from '@angular/material';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr-FR');

// PIPES

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HomeListComponent } from './home/home-list/home-list.component';

import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryDetailsComponent } from './categories/category-details/category-details.component';

import { LogCreateComponent } from './logs/log-create/log-create.component';
import { LogListComponent } from './logs/log-list/log-list.component';
import { LogDetailsComponent } from './logs/log-details/log-details.component';

import { SearchComponent } from './search/search/search.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    LogCreateComponent,
    LogListComponent,
    LogDetailsComponent,
    HomeCreateComponent,
    HomeListComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    
  ],
  providers: [
    MatIconRegistry,
    { provide: MAT_DATE_LOCALE, 
      useValue: 'fr-FR' },
    { provide: LOCALE_ID, 
      useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }