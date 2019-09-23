import { Component, OnInit } from '@angular/core';
import { Product } from '.././providers/produto.model';
import {BancoService} from '.././providers/banco.service';
import {CarrinhoService} from '.././providers/carrinho.service';
import { Category } from '.././providers/categoria.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit{

  produtos: Product[] = [];
  categorias;
  filtroSelecionado;
  valorTotal = 0;

  constructor(private _carrinhoService: CarrinhoService, private _bancoService : BancoService){}

  ngOnInit(){
    this._bancoService.retornaCategorias().subscribe(res => {
      this.categorias = res;
      this.filtroSelecionado = this.categorias[0].cardTitle;
      for(let j = 0; j < this.categorias[0].menu.length; j++){
        this.produtos.push(this.categorias[0].menu[j]);
      }
    });
  }

  adicionaCarrinho(nome){
    for(let i = 0; i < this.categorias.length; i++){
      for(let j = 0; j < this.categorias[i].menu.length; j++){
        if(nome === this.categorias[i].menu[j].name){
          var qtd = prompt("Informe a quantidade:",'1');
          if(qtd == "null" || qtd == null || qtd == "" ){
            qtd = '1';
          };
          this._carrinhoService.adicionaCarrinho(this.categorias[i].menu[j],parseInt(qtd, 10));
          break;
        }
      }
    }
    this.valorTotal = this._carrinhoService.enviaValorCarrinho();
  }

  gerarPedido(){
    if(this.valorTotal <= 0){
      alert("Não há items no carrinho!");
    }else{
      if (window.confirm("Deseja finalizar o pedido?")) {
        this._carrinhoService.criarPedido();
      }
    }
  }

  limparCarrinho(){
    if (window.confirm("Deseja limpar o carrinho?")) {
      this._carrinhoService.limparCarrinho();
      this.valorTotal = this._carrinhoService.enviaValorCarrinho();
    }
  }


  editaProduto(nome,descricao,preco){

    var novoNome = prompt("Informe um novo nome para o produto:",nome);
    if(novoNome == "null" || novoNome == null || novoNome == "" ){
      novoNome = nome;
    };

    var novaDescricao = prompt("Informe uma nova descrição para o produto:",descricao);
    if(novaDescricao == "null" || novaDescricao == null || novaDescricao == "" ){
      novaDescricao = descricao;
    };

    var novoPreco = prompt("Informe um novo preço para o produto:",preco);
    if(novoPreco == "null" || novoPreco == null || novoPreco == "" ){
      novoPreco = preco;
    };

    for(let i = 0; i < this.categorias.length; i++){
      for(let j = 0; j < this.categorias[i].menu.length; j++){
        if(nome === this.categorias[i].menu[j].name){
          console.log(this.categorias[i]);
          this.categorias[i].menu[j].name = novoNome;
          this.categorias[i].menu[j].description = novaDescricao;
          this.categorias[i].menu[j].price = novoPreco;
          this._bancoService.editCategory(this.categorias[i].id,this.categorias[i]).subscribe(
            () => window.location.reload(),
            (err) => console.log(err)
          );
          console.log(this.categorias[i]);
          break;
        }
      }
    }
  }

  selecionaFiltro(event : any){
    this.filtroSelecionado = event.target.value;
    this.produtos = [];
    this._bancoService.retornaCategorias().subscribe(res => {
      for(let i = 0; i < res.length; i++){
        if(res[i].cardTitle == this.filtroSelecionado){
          for(let j = 0; j < res[i].menu.length; j++){
            this.produtos.push(res[i].menu[j]);
          }
          break;
        }
      }
    });
  }

  deletaProduto(nome){
    if (window.confirm("Deseja excluir o produto " + nome + "?")) {
      for(let i = 0; i < this.categorias.length; i++){
        for(let j = 0; j < this.categorias[i].menu.length; j++){
          if(nome === this.categorias[i].menu[j].name){
            this.categorias[i].menu.splice(j,1);
            this._bancoService.removeProduct(this.categorias[i].id,this.categorias[i]).subscribe(
              () => window.location.reload()
            );
            break;
          }
        }
      }
    }
  }
}
