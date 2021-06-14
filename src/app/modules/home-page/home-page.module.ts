import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomePageRoutingModule } from './home-routing.module';
import {StarRateModule} from '../../shared/modules/star-raiting/star-rate.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    StarRateModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule {
}
