import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Paginador } from './locale/paginador';
import localeCo from "@angular/common/locales/es-CO";
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { QueryStringService } from './services/query-string-service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(localeCo)
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: MatPaginatorIntl, useClass: Paginador },
    QueryStringService,
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
