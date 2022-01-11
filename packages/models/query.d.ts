export declare type ListParams<T, F = keyof T> = {
  populate?: string[];
  fields?: F[];
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  searchFields?: string[];
  query?: {
    [k in keyof T]?: any;
  };
};

export declare type ListResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export declare type CreateParams<T> = T;
export declare type CreateResult<T> = T;

export declare type UpdateParams<T> = Partial<T>;
export declare type UpdateResult<T> = T;

export declare type DeleteParams = { id: string };
export declare type DeleteResult<T> = T;
