export interface Pageable {
  getPage(): number;
  getSort(): Record<string, 1 | -1>;
  getLimit(): number;
}
