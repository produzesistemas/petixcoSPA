import { SubCategoria } from './sub-categoria-model';
export class Categoria {
    id: number;
    descricao: string;
    subcategorias: SubCategoria[] = [];


    public constructor(init?: Partial<Categoria>) {
        Object.assign(this, init);
    }
}
