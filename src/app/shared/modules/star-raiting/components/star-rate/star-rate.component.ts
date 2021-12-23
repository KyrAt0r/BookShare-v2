import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => StarRatingComponent),
  //     multi: true
  //   }
  // ]
})
export class StarRatingComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() bookId;

  stars = [5, 4, 3, 2, 1];
  starControl: FormControl;
  onChange;
  onTouch;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(@Self() @Optional() public ngControl: NgControl, private cdRef: ChangeDetectorRef) {

    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.starControl = this.ngControl.control as FormControl;
    // this.starControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((val) => {
    //   console.log(val);
    //   this.cdRef.markForCheck();
    //   console.log(this.starControl)
    // });

    // this.starControl = new FormControl(this.valStar);
    // console.log(this.starControl);
    // this.starControl.valueChanges.subscribe((val) => {
    //   if (this.onChange) {
    //     this.onChange(val);
    //     this.cdRef.detectChanges();
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  writeValue(value): void {
    // this.starControl.setValue(value);
    console.log(value)
    // this.cdRef.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}

// Посмотреть реактивные формы
