import { Component, OnInit } from '@angular/core';
import {BancoService} from '.././providers/banco.service';
import { Category } from '.././providers/categoria.model';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent{

  categorias;

  constructor(private _bancoService : BancoService){}

  ngOnInit(){
    this._bancoService.retornaCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  deletaCategoria(id,nome){
    if (window.confirm("Deseja excluir a categoria " + nome + "?")) {
      this._bancoService.removeCategory(id).subscribe(
        () => window.location.reload(),
        (err) => console.log(err)
      );
    }
  }

  editaCategoria(id,titulo,subtitulo){

    var novoTitulo = prompt("Informe um novo título para a categoria:",titulo);
    if(novoTitulo == "null" || novoTitulo == null || novoTitulo == "" ){
      novoTitulo = titulo;
    };
    var novoSubTitulo = prompt("Informe um novo sub título para a categoria:",subtitulo);
    if(novoSubTitulo == "null" || novoSubTitulo == null || novoSubTitulo == "" ){
      novoSubTitulo = subtitulo;
    };

    for(let i = 0; i < this.categorias.length; i++){
      if(id === this.categorias[i].id){
        this.categorias[i].cardTitle = novoTitulo;
        this.categorias[i].cardSubtitle = novoSubTitulo;
        this._bancoService.editCategory(this.categorias[i].id,this.categorias[i]).subscribe(
          () => window.location.reload(),
          (err) => console.log(err)
        );
        break;
      }
    }
  }


}
