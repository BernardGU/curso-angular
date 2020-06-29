import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { DestinoFormComponent } from './components/destino-form/destino-form.component';
import { DestinoViajesState, DestinoViajesReducer, initializeDestinoViajesState, DestinoViajesEffects } from './reducers/destino-viajes.reducer';
import { ActionReducerMap, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthService } from './services/auth-service/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logeado/usuario-logueado.guard';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { ReservasModule } from './reservas/reservas.module';
import { AppRoutingModule } from './app-routing.module';
import { MyDatabaseService } from './services/my-database/my-database.service';
import { AppLoadService, init_app } from './services/app-load-service/app-load.service';
import { AppConfig, APP_CONFIG } from 'src/assets/app-config';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, TranslationServiceLoader } from './services/translation/translation.service';

// redux init
export interface AppState {
  destinos: DestinoViajesState;
}
const reducers: ActionReducerMap<AppState> = {
  destinos: DestinoViajesReducer
}
const reducersInitialState = {
  destinos: initializeDestinoViajesState()
}
// redux fin init

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    DestinoFormComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosDetalleComponent,
    VuelosMainComponent,
    VuelosMasInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinoViajesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReservasModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient, MyDatabaseService]
      }
    })
  ],
  providers: [
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
