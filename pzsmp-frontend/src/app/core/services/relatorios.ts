// src/app/core/services/relatorio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private apiUrl = '/api/relatorios';

  constructor(private http: HttpClient) { }

  // Método modificado para aceitar datas
  getRelatorios(dataInicio?: string, dataFim?: string): Observable<any[]> {
    let params = new HttpParams();
    if (dataInicio) {
      params = params.append('dataInicio', dataInicio);
    }
    if (dataFim) {
      params = params.append('dataFim', dataFim);
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}