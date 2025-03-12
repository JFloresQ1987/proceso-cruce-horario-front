export const enum SexoEnum {
  INDETERMINADO = 0,
  MASCULINO = 1,
  FEMENINO = 2,
}

export const TipoDocumentoEnum = {
  DNI: { code: '1', value: 'DNI', length: 8 },
  CE: { code: '2', value: 'CE', length: 12 },
};

export const enum EstadoEnum {
  INACTIVO = '0',
  ACTIVO = '1',
}

export const enum RestriccionPersonaEnum {
  VIVO = 'NINGUNA',
  FALLECIDO = 'FALLECIMIENTO',
}

export const enum TipoIngresoEnum {
  REFERIDO = '2',
}

export const enum RefiereEnum {
  SI = 'S',
  NO = 'N',
}

export const enum ServicioHospitalizacionEnum {
  SI = 'S',
  NO = 'N',
}

export const enum EstadoEvaluacionEnum {
  PENDIENTE = '1',
  APROBADO = '2',
}

export const enum LugarAtencionEnum {
  INTRAMURAL = 1,
}

export const enum EstadoMujerEnum {
  NO_GESTANTE = '0',
}

export const enum ClaveEnum {
  DEBE_CAMBIAR = '0',
}
