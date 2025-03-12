import { PaginationParams } from '../services/generic.service';

export interface ProcesoDetalle {
  etapa?: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: number;
}
