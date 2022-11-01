interface GlobalQueryParam {
  first: number;
  rows: number;
  searchName?: string;
  sortField: string;
  sortOrder: Sort;
}

enum Sort {
  Asc = 1,
  Desc = -1,
}

export { GlobalQueryParam, Sort };
