import { PaginationParams } from "./PaginationParams";

export interface UsuarioFilterDto extends PaginationParams {
  nombreCompleto?: string;
  esVigente?: string;
}