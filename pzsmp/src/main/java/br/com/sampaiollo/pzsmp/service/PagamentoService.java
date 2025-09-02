package br.com.sampaiollo.pzsmp.service;

import br.com.sampaiollo.pzsmp.dto.PagamentoRequestDto;
import br.com.sampaiollo.pzsmp.entity.*;
import br.com.sampaiollo.pzsmp.repository.MesaRepository;
import br.com.sampaiollo.pzsmp.repository.PagamentoRepository;
import br.com.sampaiollo.pzsmp.repository.PedidoRepository;
import br.com.sampaiollo.pzsmp.repository.RelatorioDiarioRepository; // <<< Verifique a importação
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal; // <<< Verifique a importação
import java.time.LocalDate;  // <<< Verifique a importação
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private MesaRepository mesaRepository;
    @Autowired
    private RelatorioDiarioRepository relatorioDiarioRepository; // <<< Injeção necessária

    @Transactional
    public Pagamento registrarPagamento(PagamentoRequestDto dto) {
        // 1. Encontra o pedido a ser pago
        Pedido pedido = pedidoRepository.findById(dto.idPedido())
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + dto.idPedido()));

        // 2. Cria e salva o registo do pagamento
        Pagamento pagamento = new Pagamento();
        pagamento.setPedido(pedido);
        pagamento.setMetodo(dto.metodo());
        pagamento.setValorPago(dto.valorPago());
        pagamento.setDatapag(LocalDateTime.now());
        pagamento.setStatus(StatusPagamento.EFETUADO);
        pagamentoRepository.save(pagamento);

        // 3. Atualiza o pedido
        pedido.setStatus(StatusPedido.PAGO);
        pedido.setDataPagamento(LocalDateTime.now());
        pedidoRepository.save(pedido);
        
        // 4. ATUALIZA O RELATÓRIO DIÁRIO EM TEMPO REAL (SOMA)
        atualizarRelatorioDiario(pedido.getTotal(), true);

        // 5. Verifica se a mesa pode ser liberada
        Mesa mesaDoPedido = pedido.getMesa();
        if (mesaDoPedido != null) {
            List<StatusPedido> statusesFinalizados = List.of(StatusPedido.PAGO, StatusPedido.ENTREGUE, StatusPedido.CANCELADO);
            long pedidosPendentes = pedidoRepository.countByMesaAndStatusNotIn(mesaDoPedido, statusesFinalizados);

            if (pedidosPendentes == 0) {
                mesaDoPedido.setStatus(StatusMesa.LIVRE);
                mesaRepository.save(mesaDoPedido);
            }
        }

        return pagamento;
    }

    /**
     * Lógica central para encontrar/criar o relatório do dia e atualizar seu valor.
     */
    private void atualizarRelatorioDiario(BigDecimal valor, boolean isSoma) {
        LocalDate hoje = LocalDate.now();
        
        RelatorioDiario relatorio = relatorioDiarioRepository.findByData(hoje)
                                        .orElse(new RelatorioDiario(hoje, BigDecimal.ZERO));
        
        if (isSoma) {
            relatorio.setValorTotal(relatorio.getValorTotal().add(valor));
        } else {
            relatorio.setValorTotal(relatorio.getValorTotal().subtract(valor));
        }

        relatorioDiarioRepository.save(relatorio);
    }
}