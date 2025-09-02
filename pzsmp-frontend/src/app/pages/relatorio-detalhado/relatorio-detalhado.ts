import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PedidoService } from '../../core/services/pedido';

@Component({
  selector: 'app-relatorio-detalhado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './relatorio-detalhado.html',
  styleUrls: ['./relatorio-detalhado.css']
})
export class RelatorioDetalhadoComponent implements OnInit { 
  pedidosDoDia: any[] = [];
  dataDoRelatorio: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.dataDoRelatorio = this.route.snapshot.paramMap.get('data');

    if (this.dataDoRelatorio) {
      this.pedidoService.getPedidosPorData(this.dataDoRelatorio).subscribe(data => {
        this.pedidosDoDia = data;
      });
    }
  }
}