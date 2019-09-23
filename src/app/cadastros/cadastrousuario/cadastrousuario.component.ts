import { Component, OnInit } from '@angular/core';
import {BancoService} from '../.././providers/banco.service';
import { User } from '../.././providers/usuario.model';

@Component({
  selector: 'app-cadastrousuario',
  templateUrl: './cadastrousuario.component.html',
  styleUrls: ['./cadastrousuario.component.css']
})
export class CadastrousuarioComponent implements OnInit {

  novoUsuario : User = {
    uid: '',
    id: 0,
    name: '',
    email: '',
    phoneNumber: '',
    photoUrl: '',
    location: '',
    points: 0,
    settingsUser: { language: '', type: '' }
  }

  nome;
  email;
  telefone;
  foto;
  cidade;
  id;

  usuarios : User[] = [];

  makeUID() {
     var result = '';
     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < 28; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  constructor(private _bancoService : BancoService) { }

  ngOnInit() {
    this._bancoService.retornaUsuarios().subscribe(res => {
      this.usuarios = res;
      this.id = this.usuarios.length + 1;
      console.log(res);
    });
  }

  criarUsuario(){
    this.novoUsuario.uid = this.makeUID();
    this.novoUsuario.id = this.id;
    this.novoUsuario.name = this.nome;
    this.novoUsuario.email = this.email;
    this.novoUsuario.phoneNumber = this.telefone;
    if(this.foto == '' || this.foto == undefined){
      this.novoUsuario.photoUrl = "assets/imgs/user.jpg";
    }else{
      this.novoUsuario.photoUrl = this.foto;
    }
    this.novoUsuario.location = this.cidade;
    this.novoUsuario.points = 0;
    this.novoUsuario.settingsUser.language = 'pt-br';
    this.novoUsuario.settingsUser.type = 'client';
    this._bancoService.incluirUsuario(this.novoUsuario).subscribe(
      () => window.location.reload()
    );;
  }

}
