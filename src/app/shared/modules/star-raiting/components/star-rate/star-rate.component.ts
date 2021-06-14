import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input, OnInit
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements OnInit, ControlValueAccessor {
  @Input() stars = [5, 4, 3, 2, 1];
  starControl = new FormControl();
  onChange;
  onTouch;

  constructor() {
  }

  ngOnInit(): void {
    this.starControl.valueChanges.subscribe((val) => {
      if (this.onChange) {
        this.onChange(val)
        console.log(val)
      }
    })
  }

  writeValue(value) {
    this.starControl.setValue(value)
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
}


//Посмотреть реактивные формы
