export class Produto {
    id: number;
    descricao: string;
    nomeImagem: string;
    detalhe: string;
    valor: number;
    valorPromocional?: number;
    subCategoriaId: number;
    promocao: boolean;
    destaque: boolean;
}
