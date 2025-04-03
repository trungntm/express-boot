import { Pageable } from './pageable'; // Adjust the path as necessary

export class PageRequest implements Pageable {
  constructor(
    private page: number = 0,
    private limit: number = 10,
    private sortBy: Record<string, 1 | -1> = { createdAt: -1 }
  ) {}

  public getPage(): number {
    return Number(this.page);
  }

  public getSort(): Record<string, 1 | -1> {
    return this.sortBy;
  }

  public getLimit(): number {
    return Number(this.limit);
  }

  static of(page: number, limit: number, sortBy: Record<string, 1 | -1>): PageRequest {
    return new PageRequest(page, limit, sortBy);
  }

  static ofPage(page: number): PageRequest {
    return new PageRequest(page, 10, { createdAt: -1 });
  }
  static ofLimit(limit: number): PageRequest {
    return new PageRequest(0, limit, { createdAt: -1 });
  }

  static ofSortBy(sortBy: Record<string, 1 | -1>): PageRequest {
    return new PageRequest(0, 10, sortBy);
  }

  static ofPageAndLimit(page: number, limit: number): PageRequest {
    return PageRequest.of(page, limit, { createdAt: -1 });
  }

  static ofDefault(): PageRequest {
    return PageRequest.ofPageAndLimit(0, 10);
  }
}
