export class EnumUtil {
  /*eslint-disable*/
  public static convertToComboboxValues(
    type: any,
    showEmptyValue = true
  ): { value: string; label: any }[] {
    let valuesEntries = Object.entries(type).map((value) => ({
      value: value[0],
      label: value[1],
    }));
    valuesEntries.unshift({ value: '', label: 'Selecione um item' });
    return valuesEntries;
  }
  /*eslint-enable*/
}
