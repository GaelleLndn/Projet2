import { NgModule } from '@angular/core';
import { MatTabsModule, MatInputModule, MatChipsModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatDialogModule} from '@angular/material'

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
    MatTabsModule, 
    MatDialogModule
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
