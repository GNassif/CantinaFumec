import { Component, OnInit } from '@angular/core';
import {BancoService} from '../.././providers/banco.service';
import { Category } from '../.././providers/categoria.model';
import { Product } from '../.././providers/produto.model';

@Component({
  selector: 'app-cadastrocategoria',
  templateUrl: './cadastrocategoria.component.html',
  styleUrls: ['./cadastrocategoria.component.css']
})
export class CadastrocategoriaComponent implements OnInit {

  produtos = [];
  id;
  titulo;
  subtitulo;
  imagem;
  categorias;

  novaCategoria : Category = {
    id: 0,
    cardSubtitle: '',
    cardTitle: '',
    imagem: '',
    menu: []
  };

  constructor(private _bancoService : BancoService) { }

  ngOnInit() {
    this._bancoService.retornaCategorias().subscribe(res => {
      this.categorias = res;
      console.log(this.categorias);
      this.id = this.categorias.length + 1;
    });
  }

  criarCategoria(){
    this.novaCategoria.id = this.id;
    this.novaCategoria.cardTitle = this.titulo;
    this.novaCategoria.cardSubtitle = this.subtitulo;
    this.novaCategoria.imagem = this.imagem;
    this.novaCategoria.menu = this.produtos;
    this._bancoService.incluirCategoria(this.novaCategoria).subscribe(
      () => window.location.reload()
    );;
  }
}
