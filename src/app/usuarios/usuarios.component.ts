import { Component, OnInit } from '@angular/core';
import {BancoService} from '.././providers/banco.service';
import { User } from '.././providers/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios;

  constructor(private _bancoService : BancoService){}

  ngOnInit(){
    this._bancoService.retornaUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  deletaUsuario(id,nome){
    console.log(id);
    if (window.confirm("Deseja excluir a categoria " + nome + "?")) {
      this._bancoService.removeUser(id).subscribe(
        () => window.location.reload(),
        (err) => console.log(err)
      );
    }
  }

  editaUsuario(id,nome,email,telefone,foto){
    console.log(id);
    var novoNome = prompt("Informe um nome para o usuário:",nome);
    if(novoNome == "null" || novoNome == null || novoNome == "" ){
      novoNome = nome;
    };

    var novoEmail = prompt("Informe um novo email para o usuário:",email);
    if(novoEmail == "null" || novoEmail == null || novoEmail == "" ){
      novoEmail = email;
    };

    var novoTelefone = prompt("Informe um novo email para o usuário:",telefone);
    if(novoTelefone == "null" || novoTelefone == null || novoTelefone == "" ){
      novoTelefone = telefone;
    };

    var novaFoto = prompt("Informe o novo URL da foto:",foto);
    if(novaFoto == "null" || novaFoto == null || novaFoto == "" || novaFoto == undefined){
      novaFoto = "assets/imgs/user.jpg";
    };


    for(let i = 0; i < this.usuarios.length; i++){
      if(id === this.usuarios[i].id){
        this.usuarios[i].name = novoNome;
        this.usuarios[i].email = novoEmail;
        this.usuarios[i].phoneNumber = novoTelefone;
        this.usuarios[i].photoUrl = novaFoto;
        this._bancoService.editUser(id,this.usuarios[i]).subscribe(
          () => window.location.reload(),
          (err) => console.log(err)
        );
        break;
      }
    }
  }


}
