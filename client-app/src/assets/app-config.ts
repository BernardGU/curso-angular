import { InjectionToken } from '@angular/core';

export interface AppConfig { apiEndpoint: string };
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');