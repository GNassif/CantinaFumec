import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import {BancoService} from './providers/banco.service';
import {CarrinhoService} from './providers/carrinho.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProdutosComponent } from './produtos/produtos.component';
import {RouterModule,Routes} from '@angular/router';
import { CadastroprodutoComponent } from './cadastros/cadastroproduto/cadastroproduto.component';
import { CadastrocategoriaComponent } from './cadastros/cadastrocategoria/cadastrocategoria.component';
import { FormsModule } from '@angular/forms';
import { CadastrousuarioComponent } from './cadastros/cadastrousuario/cadastrousuario.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    DashboardComponent,
    AppComponent,
    CategoriasComponent,
    ProdutosComponent,
    PedidosComponent,
    CadastroprodutoComponent,
    CadastrocategoriaComponent,
    CadastrousuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'categorias',
        component: CategoriasComponent
      },
      {
        path:'produtos',
        component: ProdutosComponent
      },
      {
        path:'usuarios',
        component: UsuariosComponent
      },
      {
        path:'cadastrarProduto',
        component: CadastroprodutoComponent
      },
      {
        path:'cadastrarCategoria',
        component: CadastrocategoriaComponent
      }
      ,
      {
        path:'cadastrarUsuario',
        component: CadastrousuarioComponent
      },
      {
        path:'pedidos',
        component: PedidosComponent
      }
    ])
  ],
  entryComponents:[
  ],
  providers: [BancoService, CarrinhoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
