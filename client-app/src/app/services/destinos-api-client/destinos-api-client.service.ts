import { DestinoViaje } from '../../models/destino-viaje.model';
import { Observable } from 'rxjs';
import { CreaDestinoAction, SeleccionaFavoritoAction, BorraDestinoAction, IncrementaVotosAction, DecrementaVotosAction } from '../../reducers/destino-viajes.reducer';
import { Store, State } from '@ngrx/store';
import { AppState } from '../../app.module';
import { AppConfig, APP_CONFIG } from 'src/assets/app-config';
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { MyDatabaseService } from '../my-database/my-database.service';

@Injectable({
  providedIn: 'root'
})
export class DestinosApiClient {
  
  constructor(
    private store: Store<AppState>,
    private state: State<AppState>,
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private db: MyDatabaseService
  ) { }
  getById(id:string):DestinoViaje {
    console.log('Called from nuevo class')
    return (this.state.getValue() as AppState).destinos.items.filter(item => item.id == id )[0];
  }
  fetchDestinos():Observable<DestinoViaje[]> {
    return this.store.select(state => state.destinos.items);
  }
  fetchDestinoById(id:string):Observable<DestinoViaje> {
    return this.store
               .select(state => state.destinos.items)
               .pipe( map(items =>
                 items.filter( d => (d.descripcion.toString() == id))[0]
               ));
  }
  fetchFavorito():Observable<DestinoViaje> {
    return this.store.select(state => state.destinos.favorito);
  }
  //addDestino(d:DestinoViaje) {
  //  const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
  //  const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d }, { headers: headers });
  //  this.http.request(req).subscribe((data: HttpResponse<{}>) => {
  //    if(data.status === 200) {
  //      this.store.dispatch(new CreaDestinoAction(d));
  //      this.db.destinos.add(d);
  //      console.log('todos los destinos de la db!');
  //      this.db.destinos.toArray().then(destinos => console.log(destinos));
  //    }
  //  })
  //}
  addDestino(d:DestinoViaje) {
    this.store.dispatch(new CreaDestinoAction(d));
    this.db.destinos.add(d);
  }
  deleteDestino(d: DestinoViaje) {
    this.store.dispatch(new BorraDestinoAction(d));
    this.db.destinos.where('nombre').equals(d.nombre).delete();
  }
  setFavorite(d: DestinoViaje) {
    this.store.dispatch(new SeleccionaFavoritoAction(d));
  }
  increaseVotos(d: DestinoViaje) {
    this.store.dispatch(new IncrementaVotosAction(d));
  }
  decreaseVotos(d: DestinoViaje) {
    this.store.dispatch(new DecrementaVotosAction(d));
  }
}