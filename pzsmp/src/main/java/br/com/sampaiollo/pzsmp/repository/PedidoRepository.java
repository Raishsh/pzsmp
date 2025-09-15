package br.com.sampaiollo.pzsmp.repository;

import br.com.sampaiollo.pzsmp.entity.Mesa;
import br.com.sampaiollo.pzsmp.entity.Pedido;
import br.com.sampaiollo.pzsmp.entity.StatusPedido;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    // Métodos de busca específicos
    List<Pedido> findByClienteId(Integer idCliente);
    List<Pedido> findByStatus(StatusPedido status);
    List<Pedido> findByDataBetween(LocalDateTime dataInicio, LocalDateTime dataFim);

    @Query("SELECT COALESCE(MAX(p.numeroDia), 0) FROM Pedido p WHERE p.data BETWEEN :dataInicio AND :dataFim")
    Integer findMaxNumeroDiaBetween(@Param("dataInicio") LocalDateTime dataInicio, @Param("dataFim") LocalDateTime dataFim);

    // Busca pedidos ativos de uma mesa, carregando os detalhes
    @EntityGraph(attributePaths = {"itens", "cliente", "mesa"})
    List<Pedido> findByMesaNumeroAndStatusNot(Integer numeroMesa, StatusPedido status);

    // Conta pedidos não pagos para uma mesa
    long countByMesaAndStatusNotIn(Mesa mesa, List<StatusPedido> statuses);
    List<Pedido> findByMesaNumeroAndStatusNotIn(Integer numeroMesa, List<StatusPedido> statuses);

    /**
     * Sobrescreve o método findAll() padrão para forçar o carregamento
     * (FETCH) da lista de 'itens', do objeto 'cliente' e da 'mesa' em cada pedido.
     * Isso resolve o problema de LazyInitializationException e garante que os detalhes
     * do pedido sejam enviados para o frontend.
     */
    @Override
    @EntityGraph(attributePaths = {"itens", "cliente", "mesa"})
    List<Pedido> findAll();
    
    @Query("SELECT COALESCE(SUM(p.total), 0) FROM Pedido p WHERE p.status = 'PAGO' AND p.dataPagamento BETWEEN :inicioDoDia AND :fimDoDia")
    BigDecimal sumTotalPedidosPagosByDataBetween(@Param("inicioDoDia") LocalDateTime inicioDoDia, @Param("fimDoDia") LocalDateTime fimDoDia);
    
}
