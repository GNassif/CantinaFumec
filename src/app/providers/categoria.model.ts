import {Product} from "./produto.model";
export interface Category {
    id: number;
    cardSubtitle: string;
    cardTitle: string;
    imagem: string;
    menu: Product[];
}
