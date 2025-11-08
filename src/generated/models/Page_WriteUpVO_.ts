/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {OrderItem} from "./OrderItem";
import type {WriteUpVO} from "./WriteUpVO";

export type Page_WriteUpVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<WriteUpVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
