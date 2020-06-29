import { Component, OnInit, Injectable, InjectionToken, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { DestinosApiClient } from 'src/app/services/destinos-api-client/destinos-api-client.service';


class DestinosApiClientViejo {
  getById(id:string):DestinoViaje {
    console.log('called from viejo class');
    return null;
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    DestinosApiClient,
    {provide: DestinosApiClientViejo, useExisting: DestinosApiClient}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  public destino:DestinoViaje;

  constructor(
    private route: ActivatedRoute,
    private api:DestinosApiClientViejo
  ) {  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.destino = this.api.getById(id);
  }

}
