import { PaginationParams } from '../services/generic.service';

export interface Proceso extends PaginationParams {
  idProceso?: number;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: number;
}
