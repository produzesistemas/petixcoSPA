export class ApplicationUser {
    id: string;
    providerId: string;
    provider: string;
    email: string;
    userName: string;
    phoneNumber: string;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnabled: boolean;
    accessFailedCount: number;

    telefone: string;
    nomeLoja: string;
    nomeImagem: string;
    descricaoLoja: string;
    enderecoLoja: string;
    cnpj: string;
    contatoLoja: string;
    politicaTroca: string;
    politicaEntrega: string;
    valorMinimoServico: number;
    valorMinimoProduto: number;

    public constructor(init?: Partial<ApplicationUser>) {
        Object.assign(this, init);
    }
}
