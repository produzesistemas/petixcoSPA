import { Produto } from './produto-model';

export class PedidoProduto {
    produtoId: number;
    qtd: number;
    valorProduto: number;
    descricao: string;
    nomeImagem: string;
    produto: Produto;
}
