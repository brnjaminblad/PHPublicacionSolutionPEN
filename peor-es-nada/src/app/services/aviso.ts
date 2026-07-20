import { Injectable } from '@angular/core';
import { Aviso } from '../models/aviso.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private readonly STORAGE_KEY = 'avisos';

  private avisos: Aviso[] = [];

  constructor(private storage: StorageService) {}

  async cargarAvisos(): Promise<Aviso[]> {

    this.avisos = await this.storage.obtener(this.STORAGE_KEY) || [];

    return this.avisos;

  }

  async obtenerAvisos(): Promise<Aviso[]> {

    if (this.avisos.length === 0) {

      await this.cargarAvisos();

    }

    return this.avisos;

  }

  async agregar(aviso: Aviso): Promise<void> {

    this.avisos.push(aviso);

    await this.storage.guardar(this.STORAGE_KEY, this.avisos);

  }

  async eliminar(id: number): Promise<void> {

    this.avisos = this.avisos.filter(a => a.id !== id);

    await this.storage.guardar(this.STORAGE_KEY, this.avisos);

  }

}