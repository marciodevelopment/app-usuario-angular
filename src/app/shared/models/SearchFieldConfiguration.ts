export class SearchFieldConfiguration {
  constructor(
    public field: string,
    public header: string,
    public filter: {
      filter?: boolean;
      /* eslint-disable */
      entriesType?: { value: string; label: string }[];
      width?: string;
    } = { filter: true },
    public table?: {
      width: string;
    }
  ) {}
}
