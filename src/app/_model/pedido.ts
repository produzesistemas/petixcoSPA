import { Endereco } from './endereco';
import { FormaPagamento } from './forma-pagamento';
import { TipoPedido } from './tipo-pedido';
export class Pedido {
    id: number;
    obs: string;
    lojaId: number;
    dataEntrega: Date;
    dataPedido: Date;
    tipoPedidoId: number;
    formaPagamentoId: number;
    valorTaxa: number;
    trocoPara: number;

    endereco: Endereco;
    formaPagamento: FormaPagamento;
    tipoPedido: TipoPedido;

    public constructor(init?: Partial<Pedido>) {
        Object.assign(this, init);
    }
}
