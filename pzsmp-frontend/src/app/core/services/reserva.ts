import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // URL da API de reservas
  private apiUrl = '/api/reservas';

  constructor(private http: HttpClient) { }

  /**
   * Envia os dados de uma nova reserva simplificada para a API.
   * @param reservaData Objeto contendo idMesa, nomeReserva, etc.
   */
  fazerReserva(reservaData: any): Observable<any> {
    return this.http.post(this.apiUrl, reservaData);
  }
}