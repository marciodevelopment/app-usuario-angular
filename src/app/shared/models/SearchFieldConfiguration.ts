export class SearchFieldConfiguration {
  constructor(
    public field: string,
    public header: string,
    public filter: boolean = false,
    public width?: string
  ) {}
}
