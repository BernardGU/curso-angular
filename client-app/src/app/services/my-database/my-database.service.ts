import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';

@Injectable({
  providedIn: 'root'
})
export class MyDatabaseService extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  constructor() {
    super('MyDatabaseService');
    this.version(1).stores({
      destinos: '++id, nombre, url'
    });
  }
}