import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    FormsModule,    // Necessário para usar [(ngModel)] no formulário
    CommonModule    // Necessário para usar diretivas como *ngIf
  ]
})
export class LoginComponent {

  // Objeto para armazenar os dados do formulário (login e senha)
  credentials = {
    login: '',
    senha: ''
  };

  // Variável para armazenar a mensagem de erro, caso o login falhe
  errorMessage: string | null = null;

  // Injeta o serviço de autenticação e o serviço de roteamento no construtor
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método chamado quando o formulário é enviado.
   */
  onLogin(): void {
    // Limpa qualquer mensagem de erro anterior
    this.errorMessage = null;

    // Chama o método de login no serviço de autenticação
    this.authService.login(this.credentials).subscribe({
      // Bloco 'next' é executado em caso de sucesso
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        // Redireciona o usuário para a página principal da aplicação
        this.router.navigate(['/app/pedidos']);
      },
      // Bloco 'error' é executado em caso de falha
      error: (err) => {
        console.error('Falha no login', err);
        // Define uma mensagem de erro para ser exibida na tela
        this.errorMessage = 'Login ou senha inválidos. Tente novamente.';
      }
    });
  }
}