import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [day, month, year] = value.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return super.parse(value);
  }

  override format(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0'); // Rellena con 0 si es necesario
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Rellena con 0 si es necesario
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
