export class HorarioFuncionamento {
    id: number;
    dia: number;
    horaInicial: string;
    horaFinal: string;
    storeId: number;
    ativo: boolean;

    public constructor(init?: Partial<HorarioFuncionamento>) {
        Object.assign(this, init);
    }
}
