import { Injectable, Inject, forwardRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { AppConfig, APP_CONFIG } from 'src/assets/app-config';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { InitMyDataAction } from 'src/app/reducers/destino-viajes.reducer';
import { MyDatabaseService } from '../my-database/my-database.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private db: MyDatabaseService
  ) { }

  //async initializeDestinoViajesState(): Promise<any> {
  //  const headers: HttpHeaders = new HttpHeaders();
  //  const req = new HttpRequest('GET', this.config.apiEndpoint + '/my', {headers: headers});
  //  const response: any = await this.http.request(req).toPromise();
  //  this.store.dispatch(new InitMyDataAction(response.body));
  //}
  async initializeDestinoViajesState() {
    var destinos = await this.db.destinos.toArray();
    //var destinos = [];
    this.store.dispatch(new InitMyDataAction(destinos));
  }
}

export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinoViajesState();
}