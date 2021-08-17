import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomePageRoutingModule } from './home-routing.module';
import {StarRateModule} from '../../shared/modules/star-raiting/star-rate.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookCardModule} from '../../shared/modules/book-card/book-card.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        StarRateModule,
        ReactiveFormsModule,
        BookCardModule,
        FormsModule
    ]
})
export class HomePageModule {
}
