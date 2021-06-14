import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/star-rate/star-rate.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    StarRatingComponent
  ],
  exports: [
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StarRateModule { }
