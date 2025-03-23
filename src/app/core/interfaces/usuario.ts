// import { PaginationParams } from '../services/generic.service';

import { PaginationParams } from "./PaginationParams";

export interface Usuario extends PaginationParams {
  idUsuario?: number;
  correoElectronico?: string;
  nombreCompleto?: string;
  fechaRegistro?: string;
  estado?: boolean;
}
