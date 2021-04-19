import { Cidade } from 'src/app/_model/cidade-model';
export class Endereco {
    lojaCepId: number;
    descricao: string;
    numero: string;
    bairro: string;
    nomeCidade: string;
    uf: string;
    pontoReferencia: string;
    complemento: string;
    cep: number;
    cidade: Cidade = new Cidade();

    public constructor(init?: Partial<Endereco>) {
        Object.assign(this, init);
    }
}
