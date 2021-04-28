import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomePageRoutingModule } from './home-routing.module';
import {StarRatingModule} from '../../shared/modules/star-raiting/star-rating.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    StarRatingModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule {
}
