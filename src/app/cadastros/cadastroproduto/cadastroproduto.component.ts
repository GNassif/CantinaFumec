import { Component, OnInit } from '@angular/core';
import {BancoService} from '../.././providers/banco.service';
import { Category } from '../.././providers/categoria.model';
import { Product } from '../.././providers/produto.model';

@Component({
  selector: 'app-cadastroproduto',
  templateUrl: './cadastroproduto.component.html',
  styleUrls: ['./cadastroproduto.component.css']
})
export class CadastroprodutoComponent implements OnInit {

  id;
  nome;
  descricao;
  preco;
  imagem;
  categoria;
  categorias;

  novoProduto: Product = {
    id: '',
    imagePath: '',
    name: '',
    description: '',
    price: 0
  };

  categoriaPatch;

  constructor(private _bancoService : BancoService) {
  }

  ngOnInit() {
    this._bancoService.retornaCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  criarProduto(){
    for(var i = 0; i < this.categorias.length; i++){
      if(this.categoria === this.categorias[i].cardTitle){
        this.novoProduto.id = this.nome.toLowerCase();
        this.novoProduto.imagePath = this.imagem;
        this.novoProduto.name = this.nome;
        this.novoProduto.description = this.descricao;
        this.novoProduto.price = this.preco;
        this.categorias[i].menu.push(this.novoProduto);
        this.categoriaPatch = this.categorias[i];
      }
    }
    this._bancoService.incluirProduto(this.categoriaPatch.id,this.categoriaPatch).subscribe(
      () => window.location.reload()
    );;

  }

}
