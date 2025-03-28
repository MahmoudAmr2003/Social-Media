
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidesComponent } from '../component/sides/sides.component';
import {MatTabsModule} from '@angular/material/tabs';

const myArray=[MatTabsModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,RouterModule,CommonModule,ReactiveFormsModule,FormsModule,MatSnackBarModule,SidesComponent]

@NgModule({
  declarations: [],
  imports:[ myArray],

  exports: [myArray],
  
})
export class SharedmoduleModule { }
