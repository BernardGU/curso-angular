import { Action } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { DestinoViaje } from '../models/destino-viaje.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ESTADO

export interface DestinoViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje;
}

export function initializeDestinoViajesState() {
    return {
        items: [],
        loading: false,
        favorito: null
    }
}

// ACCIONES

export enum DestinoViajesActionTypes {
    CREA_DESTINO = '[DestinoViajes] Destino creado',
    BORRA_DESTINO = '[DestinoViajes] Destino borrado',
    SELECCIONA_FAVORITO = '[DestinoViajes] Elegido favorito',
    INCREMENTA_VOTOS = '[DestinoViajes] Votos++',
    DECREMENTA_VOTOS = '[DestinoViajes] Votos--',
    INIT_MY_DATA = '[DestinoViajes] Inicializar datos'
}

export class CreaDestinoAction implements Action {
    type: string = DestinoViajesActionTypes.CREA_DESTINO;
    constructor(public destino: DestinoViaje) {}
}

export class BorraDestinoAction implements Action {
    type: string = DestinoViajesActionTypes.BORRA_DESTINO;
    constructor(public destino: DestinoViaje) {}
}

export class SeleccionaFavoritoAction implements Action {
    type: string = DestinoViajesActionTypes.SELECCIONA_FAVORITO;
    constructor(public destino: DestinoViaje) {}
}

export class IncrementaVotosAction implements Action {
    type: string = DestinoViajesActionTypes.INCREMENTA_VOTOS;
    constructor(public destino: DestinoViaje) {}
}

export class DecrementaVotosAction implements Action {
    type: string = DestinoViajesActionTypes.DECREMENTA_VOTOS;
    constructor(public destino: DestinoViaje) {}
}

export class InitMyDataAction implements Action {
    type: string = DestinoViajesActionTypes.INIT_MY_DATA;
    constructor(public destinos: DestinoViaje[]) {}
}

export type DestinoViajeActions = CreaDestinoAction | BorraDestinoAction | SeleccionaFavoritoAction |
                                  IncrementaVotosAction | DecrementaVotosAction | InitMyDataAction; // type alliassing

// REDUCERS

export function DestinoViajesReducer(
    state: DestinoViajesState,
    action: DestinoViajeActions
): DestinoViajesState {
    switch(action.type) {
        case DestinoViajesActionTypes.CREA_DESTINO:
            return {
                ...state,
                items: [...state.items, (action as CreaDestinoAction).destino]
            };
        case DestinoViajesActionTypes.BORRA_DESTINO: {
            const d:DestinoViaje = (action as BorraDestinoAction).destino;
            return {
                ...state,
                favorito: (state.favorito == d)? null : state.favorito,
                items: state.items.filter(item => item != d)
            };
        }
        case DestinoViajesActionTypes.SELECCIONA_FAVORITO:
            return {
                ...state,
                favorito: (action as SeleccionaFavoritoAction).destino
            };
        case DestinoViajesActionTypes.INCREMENTA_VOTOS: {
            const oldD:DestinoViaje = (action as IncrementaVotosAction).destino;
            const newD = oldD.copy().increaseVotos();
            return {
                ...state,
                items: state.items.map(item => (item != oldD)? item : newD)
            };
        }
        case DestinoViajesActionTypes.DECREMENTA_VOTOS: {
            const oldD:DestinoViaje = (action as DecrementaVotosAction).destino;
            const newD = oldD.copy().decreaseVotos();
            return {
                ...state,
                items: state.items.map(item => (item != oldD)? item : newD)
            };
        }
        case DestinoViajesActionTypes.INIT_MY_DATA: {
            const destinos: DestinoViaje[] = (action as InitMyDataAction).destinos;
            return {
                ...state,
                items: destinos.map((d) => new DestinoViaje(d.nombre, d.url, d.descripcion, d.servicios, d.votos, d.id))
            }
        }
    }
    return state;
}

// EFFECTS

@Injectable()
export class DestinoViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.action$.pipe(
        ofType(DestinoViajesActionTypes.CREA_DESTINO),
        map((action: CreaDestinoAction) => new SeleccionaFavoritoAction(action.destino))
    )
    constructor(private action$: Actions<DestinoViajeActions>) {}
}