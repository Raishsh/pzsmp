import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', // O seletor que é usado no index.html
  standalone: true,    // Indica que é um componente independente
  imports: [
    CommonModule,
    RouterOutlet  // <-- Importa o RouterOutlet para que a tag <router-outlet> funcione
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // A propriedade 'title' é criada por padrão pelo Angular.
  title = 'pzsmp-frontend';
}