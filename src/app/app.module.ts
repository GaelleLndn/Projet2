import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


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
import { ReverseOrderPipe } from './pipes/reverse-order.pipe';

// HTTP
import { AuthInterceptor } from './authentication/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';


// APP COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HomeListComponent } from './home/home-list/home-list.component';

import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

import { LogCreateComponent } from './logs/log-create/log-create.component';
import { LogListComponent } from './logs/log-list/log-list.component';

import { SearchComponent } from './search/search/search.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    LogCreateComponent,
    LogListComponent,
    HomeCreateComponent,
    HomeListComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent,
    ReverseOrderPipe,
    AuthenticationComponent,
    LoginComponent,
    SignUpComponent,
    ErrorComponent,
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
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true },
      { provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true },
    { provide: MAT_DATE_LOCALE, 
      useValue: 'fr-FR' },
    { provide: LOCALE_ID, 
      useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent],
  entryComponents : [ ErrorComponent ]
})

export class AppModule { }