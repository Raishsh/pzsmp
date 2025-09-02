import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../core/services/pedido';
import { Pedido } from '../../core/models/pedido.model';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.html',
  styleUrls: ['./pagamento.css']
})
export class PagamentoComponent implements OnInit {
  pedido: Pedido | null = null;
  metodoPagamento: string = ''; // Para guardar a opção selecionada

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    // Pega o ID do pedido da URL
    const pedidoId = this.route.snapshot.paramMap.get('id');
    if (pedidoId) {
      // Busca os detalhes do pedido na API
      // (Precisaremos criar este método no serviço)
      this.pedidoService.getPedidoById(+pedidoId).subscribe(data => {
        this.pedido = data;
      });
    }
  }

  confirmarPagamento(): void {
    if (!this.pedido || !this.metodoPagamento) {
      alert('Por favor, selecione um método de pagamento.');
      return;
    }

    const dadosPagamento = {
      idPedido: this.pedido.idPedido,
      metodo: this.metodoPagamento,
      valorPago: this.pedido.total
    };

    // (Precisaremos criar este método no serviço)
    this.pedidoService.registrarPagamento(dadosPagamento).subscribe({
      next: () => {
        alert('Pagamento registado com sucesso!');
        this.router.navigate(['/app/pedidos']); // Volta para a lista de pedidos
      },
      error: (err) => {
        alert('Erro ao registar o pagamento.');
        console.error(err);
      }
    });
  }
}
