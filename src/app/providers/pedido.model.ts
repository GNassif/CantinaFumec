import {CartItem} from "./carrinho.model";
export interface Order {
    id:string,
    userEmail:string,
    date: string,
    value: number,
    items: CartItem[]
}
