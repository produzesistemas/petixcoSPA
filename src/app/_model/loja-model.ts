
import { Cidade } from 'src/app/_model/cidade-model';
import { Categoria } from './categoria-model';
import { Produto } from './produto-model';
export class Loja {
    id: number;
    nome: string;
    nomeImagem: string;
    descricao: string;
    logradouro: string;
    bairro: string;
    numero: string;
    cep: string;
    nomeCidade: string;
    cnpj: string;
    contato: string;
    telefone: string;
    politicaTroca: string;
    politicaEntrega: string;
    quemSomos: string;
    aspNetUsersId: string;
    valorMinimoProduto: number;
    cidade: Cidade = new Cidade();
    produtos: Produto[] = [];
    categorias: Categoria[] = [];


    public constructor(init?: Partial<Loja>) {
        Object.assign(this, init);
    }
}
