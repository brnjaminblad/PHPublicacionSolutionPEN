import { Injectable } from '@angular/core';
import { Aviso } from '../models/aviso.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private readonly STORAGE='avisos';

  private avisos:Aviso[]=[];

  constructor(private storage:StorageService){}

  async cargar(){
    // Carga los avisos guardados en almacenamiento local.
    this.avisos=await this.storage.obtener<Aviso[]>(this.STORAGE) ?? [];

  }

  async listar(){
    // Si todavía no hay datos en memoria, los carga primero.
    if(this.avisos.length===0){

      await this.cargar();

    }

    return this.avisos;

  }

  async agregar(aviso:Aviso){
    // Añade un aviso nuevo y lo guarda en almacenamiento.
    aviso.id=Date.now();

    this.avisos.push(aviso);

    await this.storage.guardar(this.STORAGE,this.avisos);

  }

  async eliminar(id:number){
    // Elimina un aviso por su identificador.
    this.avisos=this.avisos.filter(a=>a.id!==id);

    await this.storage.guardar(this.STORAGE,this.avisos);

  }

  async actualizar(aviso:Aviso){
    // Reemplaza el aviso existente con los datos editados.
    const indice=this.avisos.findIndex(a=>a.id===aviso.id);

    if(indice>=0){

      this.avisos[indice]=aviso;

      await this.storage.guardar(this.STORAGE,this.avisos);

    }

  }

}