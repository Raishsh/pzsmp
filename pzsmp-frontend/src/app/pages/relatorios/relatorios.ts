import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <<< 1. IMPORTE O RouterModule AQUI
import { RelatorioService } from '../../core/services/relatorios'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule 
  ],
  templateUrl: './relatorios.html',
  styleUrls: ['./relatorios.css']
})
export class RelatoriosComponent implements OnInit {
  relatorios: any[] = [];
  dataInicio: string = '';
  dataFim: string = '';

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.definirPeriodoPadraoEBuscar();
  }
  
  definirPeriodoPadraoEBuscar(): void {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    this.dataFim = formatDate(hoje, 'yyyy-MM-dd', 'en-US');
    this.dataInicio = formatDate(seteDiasAtras, 'yyyy-MM-dd', 'en-US');

    this.carregarRelatorios();
  }

  carregarRelatorios(): void {
    this.relatorioService.getRelatorios(this.dataInicio, this.dataFim).subscribe({
      next: (data) => {
        this.relatorios = data;
      },
      error: (err) => {
        console.error('Erro ao carregar relatórios', err);
        alert('Não foi possível carregar os relatórios.');
      }
    });
  }
  
  limparFiltro(): void {
    this.definirPeriodoPadraoEBuscar();
  }
}