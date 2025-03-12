export class DateUtils {
  /**
   * Formatea una fecha para el backend (YYYY-MM-DD)
   */
  static formatToBackend(date: Date | string | null): string | null {
    if (!date) return null;
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return null;
      return d.toISOString().split('T')[0];
    } catch {
      return null;
    }
  }

  /**
   * Formatea una fecha del backend para mostrar en la UI (DD/MM/YYYY)
   */
  static formatToDisplay(date: string | Date | null): string {
    if (!date) return '';
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) return '';
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    } catch {
      return '';
    }
  }

  /**
   * Convierte un string fecha del backend a objeto Date
   */
  static parseBackendDate(dateStr: string | null): Date | null {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  }

  /**
   * Obtiene la fecha actual en formato YYYY-MM-DD
   */
  static getCurrentDate(): string {
    return this.formatToBackend(new Date()) || '';
  }

  /**
   * Verifica si una fecha es válida
   */
  static isValidDate(date: any): boolean {
    if (!date) return false;
    const d = date instanceof Date ? date : new Date(date);
    return !isNaN(d.getTime());
  }
}
