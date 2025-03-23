import { PaginationParams } from "./PaginationParams";

export interface Proceso extends PaginationParams {
  idProceso?: number;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: number;
}
