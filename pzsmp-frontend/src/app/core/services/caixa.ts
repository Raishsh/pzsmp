import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para definir o corpo da requisição
interface SangriaRequest {
  valor: number;
  observacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaixaService {
  private apiUrl = '/api/caixa';

  constructor(private http: HttpClient) { }

  /**
   * Envia uma requisição para registrar uma sangria no caixa.
   * @param valor O valor a ser retirado.
   * @param observacao O motivo da retirada.
   * @returns Um Observable com a resposta da API.
   */
  realizarSangria(valor: number, observacao: string): Observable<any> {
    const requestBody: SangriaRequest = { valor, observacao };
    return this.http.post<any>(`${this.apiUrl}/sangria`, requestBody);
  }

  getSangrias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sangrias`);
  }
}