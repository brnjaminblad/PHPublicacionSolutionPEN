import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true,
})
export class FechaPipe implements PipeTransform {
  transform(value: unknown): string {
    if (!value) {
      return '';
    }

    const fecha = value instanceof Date ? value : new Date(value as string);

    if (Number.isNaN(fecha.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(fecha);
  }
}
