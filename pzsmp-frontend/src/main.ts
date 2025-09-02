import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Nome da classe corrigido

bootstrapApplication(AppComponent, appConfig) // <-- Nome da classe corrigido
  .catch((err) => console.error(err));