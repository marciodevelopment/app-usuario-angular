import { FormGroup } from '@angular/forms';

export class FormGroupUtils {
  public static generateInterfaceFormGroup<T>(formGroup: FormGroup): T {
    const formJson = JSON.stringify(formGroup.value);
    const target: T = JSON.parse(formJson);
    return target;
  }

  public static copyToFormGroup<T>(source: T, formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const value = source[controlName as keyof T];
      formGroup.controls[
        controlName as keyof typeof formGroup.controls
      ].setValue(value as string);
    });
  }
}
