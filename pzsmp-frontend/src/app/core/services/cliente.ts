import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // A API de clientes é pública, mas a listagem pode ser privada
  private apiUrl = '/api/clientes';

  constructor(private http: HttpClient) { }

  /**
   * Busca a lista de todos os clientes.
   */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  /**
   * Cadastra um novo cliente.
   * @param clienteData Objeto com nome, telefone e email.
   */
  cadastrarCliente(clienteData: any): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, clienteData);
  }

  atualizarCliente(id: number, clienteData: any): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, clienteData);
}

/**
 * Envia uma requisição para deletar um cliente.
 */
excluirCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
buscarClientes(termo: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar`, { params: { termo } });
}
}
