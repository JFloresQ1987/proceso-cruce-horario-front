import { RolDto } from "./rol-dto";

export interface UsuarioUpdateDto {
  idUsuario?: number;
  correoElectronico?: string;
  nombreCompleto?: string;
  roles?: RolDto[];
}
