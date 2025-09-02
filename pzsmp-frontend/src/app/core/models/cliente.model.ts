// Define a estrutura de um objeto Endereco
export interface Endereco {
  rua: string;
  bairro: string;
  numero: number;
  cidade: string;
  cep: string;
}

// O Cliente agora pode ter um objeto Endereco aninhado
export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco?: Endereco; // O endereço é opcional
}