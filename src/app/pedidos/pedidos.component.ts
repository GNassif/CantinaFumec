import { Component, OnInit } from '@angular/core';
import {BancoService} from '.././providers/banco.service';
import { Order } from '.././providers/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos;

  constructor(private _bancoService : BancoService) { }

  ngOnInit(){
    this._bancoService.retornaPedidos().subscribe(res => {
      this.pedidos = res;
    });
  }



}
