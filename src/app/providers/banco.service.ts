import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './produto.model';
import { Category } from './categoria.model';
import { User } from './usuario.model';
import { Order } from './pedido.model';
import { Observable } from 'rxjs';
import { CANTINAFUMEC_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }

  public retornaPedidos(): Observable<Order[]>{
    return this.http.get<Order[]>(`${CANTINAFUMEC_API}/ordersList`);
  }

  public retornaUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(`${CANTINAFUMEC_API}/users`);
  }

  public retornaCategorias(): Observable<Category[]>{
    return this.http.get<Category[]>(`${CANTINAFUMEC_API}/category`);
  }

  public incluirCategoria(data){
    return this.http.post(`${CANTINAFUMEC_API}/category/`,data);
  }

  public incluirPedido(data){
    console.log(data);
    return this.http.post(`${CANTINAFUMEC_API}/ordersList/`,data);
  }

  public incluirUsuario(data){
    return this.http.post(`${CANTINAFUMEC_API}/users/`,data);
  }

  public incluirProduto(id:number,data){
    return this.http.patch(`${CANTINAFUMEC_API}/category/${id}`,data);
  }

  public removeCategory(id: number): Observable<Category[]>{
    return this.http.delete<Category[]>(`${CANTINAFUMEC_API}/category/${id}`);
  }

  public removeUser(id: number): Observable<User[]>{
    return this.http.delete<User[]>(`${CANTINAFUMEC_API}/users/${id}`);
  }

  public removeProduct(id:number,data){
    return this.http.patch(`${CANTINAFUMEC_API}/category/${id}`,data);
  }

  public editCategory(id: number,dados){
    return this.http.patch(`${CANTINAFUMEC_API}/category/${id}`,dados);
  }

  public editUser(id: number,dados){
    return this.http.patch(`${CANTINAFUMEC_API}/users/${id}`,dados);
  }

}
