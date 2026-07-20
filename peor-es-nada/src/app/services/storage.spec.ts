import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async guardar(key: string, value: any): Promise<void> {

    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });

  }

  async obtener(key: string): Promise<any> {

    const { value } = await Preferences.get({ key });

    return value ? JSON.parse(value) : null;

  }

  async eliminar(key: string): Promise<void> {

    await Preferences.remove({ key });

  }

}