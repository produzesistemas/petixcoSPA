export class ShoppingCart {
    produtoId: number;
    qtd: number;
    valorProduto: number;
    lojaId: number;
    obs: string;

    public constructor(init?: Partial<ShoppingCart>) {
        Object.assign(this, init);
    }
}
