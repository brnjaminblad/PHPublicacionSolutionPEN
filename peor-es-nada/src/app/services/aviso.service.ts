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

    this.avisos=await this.storage.obtener<Aviso[]>(this.STORAGE) ?? [];

  }

  async listar(){

    if(this.avisos.length===0){

      await this.cargar();

    }

    return this.avisos;

  }

  async agregar(aviso:Aviso){

    aviso.id=Date.now();

    this.avisos.push(aviso);

    await this.storage.guardar(this.STORAGE,this.avisos);

  }

  async eliminar(id:number){

    this.avisos=this.avisos.filter(a=>a.id!==id);

    await this.storage.guardar(this.STORAGE,this.avisos);

  }

  async actualizar(aviso:Aviso){

    const indice=this.avisos.findIndex(a=>a.id===aviso.id);

    if(indice>=0){

      this.avisos[indice]=aviso;

      await this.storage.guardar(this.STORAGE,this.avisos);

    }

  }

}