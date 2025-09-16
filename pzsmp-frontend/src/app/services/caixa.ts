import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  // Um Subject privado que vai emitir o evento
  private fecharCaixaSource = new Subject<void>();

  // Um Observable público que os componentes podem "escutar"
  fecharCaixa$ = this.fecharCaixaSource.asObservable();

  // Método que será chamado pelo botão "Fechar Caixa"
  notificarFechamentoDeCaixa() {
    this.fecharCaixaSource.next();
  }
}