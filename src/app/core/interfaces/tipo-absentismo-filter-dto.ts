import { PaginationParams } from "./PaginationParams";

export interface TipoAbsentismoFilterDto extends PaginationParams {
  descripcion?: string;
  grupo?: string;
}