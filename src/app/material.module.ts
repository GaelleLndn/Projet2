import { NgModule } from '@angular/core';
import { MatTabsModule, MatInputModule, MatChipsModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material'

@NgModule({
  imports: [
    MatChipsModule,
    MatInputModule, 
    MatCardModule,
    MatButtonModule, 
    MatToolbarModule,
    MatExpansionModule, 
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule,
    MatTabsModule
  ],
  exports:[
    MatChipsModule,
    MatInputModule, 
    MatCardModule,
    MatButtonModule, 
    MatToolbarModule,
    MatExpansionModule, 
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSelectModule,
    MatTabsModule
  ],
  declarations: []
})
export class MaterialModule { }
