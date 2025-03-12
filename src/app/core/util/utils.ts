export function inputOnlyNumber(event: Event): void {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
  input.value = value;
}

export function inputOnlyNumberAndDecimal(event: Event): void {
  const input = event.target as HTMLInputElement;
  const regex = /^\d*\.?\d*$/; // Expresión regular para números positivos con decimales
  if (!regex.test(input.value)) {
    input.value = input.value.replace(/[^0-9.]/g, ''); // Permite solo números y puntos decimales
  }
  const parts = input.value.split('.'); // Asegurarse de que solo haya un punto decimal
  if (parts.length > 2) {
    input.value = `${parts[0]}.${parts.slice(1).join('')}`; // Corrige múltiples puntos decimales
  }
}
