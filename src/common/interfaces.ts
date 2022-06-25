export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IResponse {
  message: string;
  data?: any;
}

export interface QueryList {
  offset?: number;
  limit?: number;
  'order-by'?: string;
}

export interface QueryMotelList extends QueryList {
  range: string;
}
