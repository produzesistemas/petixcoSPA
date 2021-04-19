export class LojaCEP {
    id: number;
    cep: string;
    valorFrete: number;
    ativo: boolean;

    public constructor(init?: Partial<LojaCEP>) {
        Object.assign(this, init);
    }
}
