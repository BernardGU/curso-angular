import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/services/destinos-api-client/destinos-api-client.service';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {

  updates: string[];

  constructor(
    public api:DestinosApiClient
  ) { }
  
  ngOnInit(): void {
    this.updates = [];
    this.api.fetchFavorito().subscribe((d: DestinoViaje) => {
      if(d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }
}
