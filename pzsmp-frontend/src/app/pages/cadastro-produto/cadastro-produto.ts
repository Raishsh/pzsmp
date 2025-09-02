import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../core/services/produto';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.html',
  styleUrls: ['./cadastro-produto.css']
})
export class CadastroProdutoComponent {
  produto = {
    nome: '',
    preco: null,
    tipo: ''
  };
  arquivoSelecionado: File | null = null;
  mensagemSucesso: string | null = null;

  constructor(private produtoService: ProdutoService) {}

  // Este método é chamado quando um arquivo é selecionado
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
    }
  }

  cadastrar(): void {
    this.mensagemSucesso = null;

    // Usamos FormData para enviar dados de formulário e arquivos
    const formData = new FormData();
    formData.append('nome', this.produto.nome);
    if (this.produto.preco !== null) {
        formData.append('preco', this.produto.preco);
    }
    formData.append('tipo', this.produto.tipo);
    if (this.arquivoSelecionado) {
      formData.append('imagem', this.arquivoSelecionado, this.arquivoSelecionado.name);
    }

    this.produtoService.cadastrarProduto(formData).subscribe({
      next: (response) => {
        console.log('Produto cadastrado!', response);
        this.mensagemSucesso = `Produto "${response.nome}" cadastrado com sucesso!`;
        this.limparFormulario();
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto', err);
        this.mensagemSucesso = 'Erro ao cadastrar produto. Tente novamente.';
      }
    });
  }

  limparFormulario(): void {
    this.produto = { nome: '', preco: null, tipo: '' };
    this.arquivoSelecionado = null;
    // Opcional: resetar o input de arquivo (um pouco mais complexo)
    const fileInput = document.getElementById('imagem') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}