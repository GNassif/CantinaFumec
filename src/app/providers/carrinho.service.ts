import { Injectable } from '@angular/core';
import { Product } from './produto.model';
import { CartItem} from './carrinho.model';
import { Order} from './pedido.model';
import { User } from './usuario.model';
import {BancoService} from '.././providers/banco.service';

@Injectable()
export class CarrinhoService {

  carrinho : CartItem[] = [];
  pedidos;
  totalPedido = 0;
  usuarios : User[] = [];

  novoPedido : Order = {
      id:'',
      userEmail:'',
      date: '',
      value: 0,
      items: null
  }

  constructor(private _bancoService : BancoService) {
    this._bancoService.retornaUsuarios().subscribe(res => {
      this.usuarios = res;
    });
   }

  enviaValorCarrinho(){
    return this.totalPedido;
  }

  limparCarrinho(){
    this.carrinho = [];
    this.totalPedido = 0;
  }

  adicionaCarrinho(data,qtd){
    let novoItem : CartItem= {
      menuItem: data,
      quantity: qtd
    }
    this.totalPedido += data.price*qtd;
    this.carrinho.push(novoItem);
  }

  makeUID() {
     var result = '';
     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < 28; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }



  criarPedido(){
    this.novoPedido.id = this.makeUID();
    this.novoPedido.userEmail = this.usuarios[0].email;
    this.novoPedido.date = new Date().toString();
    this.novoPedido.value = this.totalPedido;
    this.novoPedido.items = this.carrinho;
    this._bancoService.incluirPedido(this.novoPedido).subscribe(
      () => window.location.reload()
    );;
  }

}
