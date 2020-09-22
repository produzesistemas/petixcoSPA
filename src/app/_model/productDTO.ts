import { Category } from '../_model/category';
import { Product } from '../_model/product';
import { Store } from '../_model/store';

export class ProdutoDTO {
produtos: Product [];
categorias: Category[];
store: Store;
cep: string;

}

