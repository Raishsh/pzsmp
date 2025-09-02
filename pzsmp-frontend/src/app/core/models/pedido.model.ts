export interface ItemPedido {
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Cliente {
  id: number;
  nome: string;
}

export interface Pedido {
  idPedido: number;
  data: string;
  status: string;
  total: number;
  cliente?: Cliente;
  itens: ItemPedido[];
  numeroMesa?: number;
  nomeClienteTemporario?: string; // <<< CAMPO ADICIONADO AQUI
}