export interface PaginacionResponse<T> {
  totalRegistros: number;
  paginaActual: number;
  tamañoPagina: number;
  totalPaginas: number;
  datos: T[];
}