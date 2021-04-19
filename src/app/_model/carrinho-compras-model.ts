export class CarrinhoCompras {
    produtoId: number;
    qtd: number;
    valorProduto: number;
    lojaId: number;
    obs: string;
    descricao: string;
    nomeImagem: string;

    public constructor(init?: Partial<CarrinhoCompras>) {
        Object.assign(this, init);
    }
}
