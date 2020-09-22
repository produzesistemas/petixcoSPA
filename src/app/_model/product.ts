export class Product {
    id: number;
    descricao: string;
    nomeImagem: string;
    detalhe: string;
    valor: number;
    valorPromocional?: number;
    lojaId: number;
    subCategoriaId: number;
    promocao: boolean;
    destaque: boolean;
}