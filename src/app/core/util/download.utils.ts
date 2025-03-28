/**
 * Descarga un archivo.
 * @param blob - Archivo.
 * @param fileName - Nombre del archivo.
 * @returns - void.
 */
export function saveFile(blob: Blob, fileName: string): void {
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
}
