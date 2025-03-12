/**
 * Formatea una cadena de texto para convertirla en una fecha con el formato dd/MM/yyyy.
 * @param value - Valor a formatear.
 * @returns - La fecha formateada con formato dd/MM/yyyy.
 */
export function formatDateWithSlashes(value: string): string {
    // Elimina todos los caracteres no numéricos
    let cleanValue = value.replace(/\D/g, '');
  
    // Inserta los '/' automáticamente después del día y el mes
    let formattedValue = cleanValue.slice(0, 2); // Día
    if (cleanValue.length > 2) {
      formattedValue += '/'; // Inserta el '/' después del día
      formattedValue += cleanValue.slice(2, 4); // Mes
    }
    if (cleanValue.length > 4) {
      formattedValue += '/'; // Inserta el '/' después del mes
      formattedValue += cleanValue.slice(4, 8); // Año
    }
  
    return formattedValue;
  }
  
  /**
   * Aplica la función de formato de fecha en un input de evento.
   * @param event - El evento del input.
   */
  export function applyDateFormatToInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = formatDateWithSlashes(input.value);
  }
  