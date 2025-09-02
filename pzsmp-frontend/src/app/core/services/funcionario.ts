import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = '/api/funcionarios';

  constructor(private http: HttpClient) { }

  // Busca a lista de todos os funcionários
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  // Cadastra um novo funcionário
  cadastrarFuncionario(funcionarioData: any): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionarioData);
  }

   atualizarFuncionario(id: number, funcionarioData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, funcionarioData);
  }

  // <<< NOVO MÉTODO PARA EXCLUIR >>>
  excluirFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}