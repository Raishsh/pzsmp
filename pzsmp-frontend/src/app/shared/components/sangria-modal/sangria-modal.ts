// src/app/shared/components/sangria-modal/sangria-modal.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// --- CAMINHO CORRIGIDO AQUI ---
import { CaixaService } from '../../../core/services/caixa'; 

@Component({
  selector: 'app-sangria-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sangria-modal.html',
  styleUrls: ['./sangria-modal.css']
})
export class SangriaModalComponent {
  @Output() close = new EventEmitter<void>();

  valor: number | null = null;
  observacao: string = '';

  constructor(private caixaService: CaixaService) {}

  realizarSangria(): void {
    if (!this.valor || this.valor <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    this.caixaService.realizarSangria(this.valor, this.observacao).subscribe({
      next: () => {
        alert('Sangria registrada com sucesso!');
        this.close.emit();
      },
      error: (err) => {
        alert('Erro ao registrar a sangria. Verifique suas permissões.');
        console.error(err);
      }
    });
  }

  cancelar(): void {
    this.close.emit();
  }
}