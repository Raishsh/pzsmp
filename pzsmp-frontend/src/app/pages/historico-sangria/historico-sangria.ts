import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaixaService } from '../../core/services/caixa';
import { AuthService } from '../../core/services/auth'; // <<< IMPORTE O AUTH SERVICE
import { SangriaModalComponent } from '../../shared/components/sangria-modal/sangria-modal'; // <<< IMPORTE O MODAL

@Component({
  selector: 'app-historico-sangria',
  standalone: true,
  imports: [CommonModule, FormsModule, SangriaModalComponent], // <<< ADICIONE O MODAL AQUI
  templateUrl: './historico-sangria.html',
  styleUrls: ['./historico-sangria.css']
})
export class HistoricoSangriaComponent implements OnInit {
  historico: any[] = [];
  mostrarModalSangria = false; // <<< Propriedade para controlar o modal
  cargoUsuario: string | null = null; // <<< Propriedade para o cargo

  constructor(
    private caixaService: CaixaService,
    private authService: AuthService // <<< INJETE O AUTH SERVICE
  ) {}

  ngOnInit(): void {
    this.cargoUsuario = this.authService.getCargoUsuarioLogado(); // <<< Busque o cargo
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.caixaService.getSangrias().subscribe({
      next: (data) => { this.historico = data; },
      error: (err) => { console.error('Erro ao carregar histórico', err); }
    });
  }

  // <<< MÉTODOS MOVIDOS PARA CÁ >>>
  abrirModalSangria(): void {
    this.mostrarModalSangria = true;
  }

  fecharModalSangria(): void {
    this.mostrarModalSangria = false;
    // BÔNUS: Atualiza a lista automaticamente após fechar o modal
    this.carregarHistorico(); 
  }
}