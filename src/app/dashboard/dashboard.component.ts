import { Component, OnInit } from '@angular/core';
import { Product } from '.././providers/produto.model';
import { User } from '.././providers/usuario.model';
import {BancoService} from '.././providers/banco.service';
import {Category} from '.././providers/categoria.model';
import { Order } from '.././providers/pedido.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categorias : Category[] = [];
  produtos : Product[] = [];
  usuarios : User[] = [];
  pedidos : Order [] = [];

  constructor(private _bancoService : BancoService){}

  ngOnInit(){
    this._bancoService.retornaCategorias().subscribe(res => {
      this.categorias = res;
      for(let i = 0; i < res.length; i++){
        for(let j = 0; j < res[i].menu.length; j++){
          this.produtos.push(res[i].menu[j]);
        }
      }
    });
    this._bancoService.retornaUsuarios().subscribe(res => {
      this.usuarios = res;
    });
    this._bancoService.retornaPedidos().subscribe(res => {
      this.pedidos = res;
    });
  }

}
