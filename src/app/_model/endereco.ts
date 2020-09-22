export class Endereco {
    lojaCepId: number;
    descricao: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    pontoReferencia: string;
    complemento: string;

    public constructor(init?: Partial<Endereco>) {
        Object.assign(this, init);
    }
}
