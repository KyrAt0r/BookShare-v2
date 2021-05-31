import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {
  @Input() stars = [1, 2, 3, 4, 5];

  @ViewChildren('checkbox') checkbox: QueryList<ElementRef>;

  value;

  constructor() {
  }

  rate(rate) {
    this.propagateChange(rate);
  }

  writeValue(value) {
    if (this.checkbox && value === null) {
      this.checkbox.forEach((checkbox: ElementRef) => {
        checkbox.nativeElement.checked = false;
      });
    }
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
  }

  private propagateChange = (_: any) => {
  };
}


//Посмотреть реактивные формы
