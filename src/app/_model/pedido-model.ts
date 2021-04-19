import { Endereco } from './endereco';
import { FormaPagamento } from './forma-pagamento';
import { PedidoProduto } from './pedido-produto-model';
import { PedidoAcompanhamento } from './pedido-acompanhamento-model';
import { StatusPagamentoPedido } from './status-pagamento-pedido-model';
import { Loja } from './loja-model';
export class Pedido {
    id: number;
    obs: string;
    dataPrevistaEntrega: Date;
    tipoPedidoId: number;
    lojaId: number;
    formaPagamentoId: number;
    statusPagamentoPedidoId: number;
    valorTaxa: number;
    trocoPara: number;
    aspNetUsersIdTo: string;
    paymentId: string;
    endereco: Endereco;
    statusPagamentoPedido: StatusPagamentoPedido;
    formaPagamento: FormaPagamento;
    loja: Loja;
    pedidoProdutos: PedidoProduto[] = [];
    pedidoAcompanhamentos: PedidoAcompanhamento[] = [];
}
