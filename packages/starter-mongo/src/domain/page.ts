import { WithId } from 'mongodb';

export class Page<T> {
  constructor(
    public results: WithId<T>[],
    public total: number = 0,
    public page: number = 0,
    public limit: number = 10,
    public sortBy: Record<string, 1 | -1>
  ) {}

  static builder<T>(): PageBuilder<T> {
    return new PageBuilder<T>();
  }
}

export class PageBuilder<T> {
  private results: WithId<T>[] = [];
  private total: number = 0;
  private page: number = 0;
  private limit: number = 10;
  private sortBy: Record<string, 1 | -1> = {};

  withResults(results: WithId<T>[]): this {
    this.results = results;
    return this;
  }

  withTotal(total: number): this {
    this.total = total;
    return this;
  }

  withPage(page: number): this {
    this.page = page;
    return this;
  }

  withLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  withSortBy(sortBy: Record<string, 1 | -1>): this {
    this.sortBy = sortBy;
    return this;
  }

  build(): Page<T> {
    return new Page<T>(this.results, this.total, this.page, this.limit, this.sortBy);
  }
}
