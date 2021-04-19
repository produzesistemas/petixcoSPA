import { StatusPedido } from 'src/app/_model/status-pedido-model';
import { StatusPagamentoPedido } from 'src/app/_model/status-pagamento-pedido-model';
export class PedidoAcompanhamento {
    statusPedidoId: number;
    pedidoId: number;
    data: Date;
    statusPedido: StatusPedido;
    statusPagamentoPedido: StatusPagamentoPedido;
}
