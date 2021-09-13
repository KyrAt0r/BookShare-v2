import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  forwardRef,
  Input, OnInit
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() readonly = false;
  @Input() valStar: number;

  starControl = new FormControl();
  onChange;
  onTouch;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.starControl = new FormControl(this.valStar);
    this.starControl.valueChanges.subscribe((val) => {
      if (this.onChange) {
        this.onChange(val);
        this.cdRef.detectChanges();
      }
    });
  }

  writeValue(value): void {
    this.starControl.setValue(value);
    this.cdRef.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}


//Посмотреть реактивные формы
