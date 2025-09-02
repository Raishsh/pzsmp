// Importações necessárias no topo do arquivo
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'; // Importa os dados do pt-BR

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

// <<< PASSO 1: Registra os dados do idioma português na aplicação >>>
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    
    // <<< PASSO 2: Define 'pt-BR' como o idioma padrão para os pipes >>>
    { provide: LOCALE_ID, useValue: 'pt-BR' } 
  ]
};