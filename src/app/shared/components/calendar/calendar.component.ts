import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CalendarComponent),
    },
  ],
})
export class CalendarComponent implements ControlValueAccessor {
  @Input()
  public placeholder!: string;
  @Input()
  public dateFormat!: string;
  private onChangeFormControl!: any;
  public date!: Date | null;

  writeValue(dateStr: string): void {
    if (dateStr) this.date = new Date(dateStr);
  }

  onBlur(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const newDate: Date | null = this.convertStringToDate(value);
    console.log('this.date on blur', this.date);
    this.onChangeFormControl(this.date);
  }

  onClose(event: Event) {
    console.log('this.date onClose', this.date);
    this.onChangeFormControl(this.date);
  }
  onFocus(event: Event) {
    console.log('on onFocus', event);
  }
  onSelect(event: Event) {
    console.log('on select', event);
  }
  onTodayClick(event: Date) {
    console.log('onTodayClick', event);
  }

  onInput(event: Event) {
    console.log('onInputevent', event);
  }

  convertStringToDate(dateString: string): Date | null {
    const [day, month, year] = dateString.split('/').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null; // Invalid date format
    }

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return null; // Invalid date
    }

    return date;
  }

  registerOnChange(onChange: any): void {
    this.onChangeFormControl = onChange;
  }
  registerOnTouched(onTouched: any): void {}
}
