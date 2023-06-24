export class DynamicFilter {
  constructor(
    public name: string,
    public field: string,
    public width?: string,
    /* eslint-disable */
    public entriesType?: { value: string; label: string }[],
    public value?: any
  ) {}
}
