import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMasInfoComponent } from './components/vuelos/vuelos-mas-info/vuelos-mas-info.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle/vuelos-detalle.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logeado/usuario-logueado.guard';

const childrenRoutesVuelos: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: VuelosComponent},
  {path: 'mas-info', component: VuelosMasInfoComponent},
  {path: ':id', component: VuelosDetalleComponent},
]
  
const routes:Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino/:id', component: DestinoDetalleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [ UsuarioLogueadoGuard ]},
  {path: 'vuelos', component: VuelosComponent, canActivate: [UsuarioLogueadoGuard], children: childrenRoutesVuelos}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
