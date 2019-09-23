import { Component } from '@angular/core';
import { Product } from './providers/produto.model';
import { User } from './providers/usuario.model';
import {BancoService} from './providers/banco.service';
import {Category} from './providers/categoria.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cantina FUMEC';

  categorias : Category [] = [];
  produtos : Product[] = [];
  usuarios : User[] = [];
  nome;
  email;
  foto;

  constructor(private _bancoService : BancoService){}

  ngOnInit(){
    this._bancoService.retornaUsuarios().subscribe(res => {
      this.usuarios = res;
      this.nome = this.usuarios[0].name;
      this.foto = this.usuarios[0].photoUrl;
      this.email = this.usuarios[0].email;
    });
    this._bancoService.retornaCategorias().subscribe(res => {
      this.categorias = res;
      for(let i = 0; i < res.length; i++){
        for(let j = 0; j < res[i].menu.length; j++){
          this.produtos.push(res[i].menu[j]);
        }
      }
    });
  }

  sair(){
    alert("Você foi deslogado!");
    alert("Mentira, não foi não!");
  }
}
