package br.com.sampaiollo.pzsmp.service;

import br.com.sampaiollo.pzsmp.dto.AdicionarItensRequest;
import br.com.sampaiollo.pzsmp.dto.PedidoRequestDto;
import br.com.sampaiollo.pzsmp.dto.PedidoResponseDto;
import br.com.sampaiollo.pzsmp.entity.*;
import br.com.sampaiollo.pzsmp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort; 
import jakarta.persistence.EntityManager;
import br.com.sampaiollo.pzsmp.repository.ItemPedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private MesaRepository mesaRepository;
    @Autowired
    private RelatorioDiarioRepository relatorioDiarioRepository;
    @Autowired
    private SangriaRepository sangriaRepository;
     @Autowired
    private EntityManager entityManager;
      @Autowired
    private ItemPedidoRepository itemPedidoRepository;
      @Autowired
    private PagamentoRepository pagamentoRepository;

    @Transactional
    public PedidoResponseDto realizarPedido(PedidoRequestDto pedidoDto) {
        Cliente cliente = null;
        if (pedidoDto.getIdCliente() != null) {
            cliente = clienteRepository.findById(pedidoDto.getIdCliente())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + pedidoDto.getIdCliente()));
        }

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setData(LocalDateTime.now());
        pedido.setStatus(StatusPedido.PREPARANDO);
        pedido.setNomeClienteTemporario(pedidoDto.getNomeClienteTemporario());

        if (pedidoDto.getIdMesa() != null) {
            Mesa mesa = mesaRepository.findById(pedidoDto.getIdMesa())
                    .orElseThrow(() -> new RuntimeException("Mesa não encontrada com número: " + pedidoDto.getIdMesa()));
            pedido.setMesa(mesa);
            mesa.setStatus(StatusMesa.OCUPADA);
            mesaRepository.save(mesa);
        }

        BigDecimal totalPedido = BigDecimal.ZERO;
        List<ItemPedido> itensDoPedido = new ArrayList<>();
        for (var itemDto : pedidoDto.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getIdProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + itemDto.getIdProduto()));
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemDto.getQuantidade());
            itemPedido.setPreco(produto.getPreco());
            itemPedido.setPedido(pedido);
            itensDoPedido.add(itemPedido);
            totalPedido = totalPedido.add(produto.getPreco().multiply(BigDecimal.valueOf(itemDto.getQuantidade())));
        }
        pedido.setItens(itensDoPedido);
        pedido.setTotal(totalPedido);

        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        return new PedidoResponseDto(pedidoSalvo);
    }

    @Transactional
    public PedidoResponseDto atualizarStatus(Integer pedidoId, String novoStatus) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + pedidoId));
        StatusPedido statusEnum = StatusPedido.valueOf(novoStatus.toUpperCase());
        pedido.setStatus(statusEnum);
        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        return new PedidoResponseDto(pedidoSalvo);
    }

    public Optional<PedidoResponseDto> buscarPorId(Integer id) {
        return pedidoRepository.findById(id).map(PedidoResponseDto::new);
    }

    public List<PedidoResponseDto> listarTodos() {
        return pedidoRepository.findAll().stream()
                .map(PedidoResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<PedidoResponseDto> buscarPorMesa(Integer numeroMesa) {
        List<StatusPedido> statusesExcluidos = List.of(StatusPedido.ENTREGUE, StatusPedido.CANCELADO, StatusPedido.PAGO);
        List<Pedido> pedidosAtivos = pedidoRepository.findByMesaNumeroAndStatusNotIn(numeroMesa, statusesExcluidos);
        return pedidosAtivos.stream()
                .map(PedidoResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public PedidoResponseDto adicionarItens(Integer pedidoId, AdicionarItensRequest request) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + pedidoId));

        for (var itemDto : request.itens()) {
            Produto produto = produtoRepository.findById(itemDto.getIdProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + itemDto.getIdProduto()));
            ItemPedido novoItem = new ItemPedido();
            novoItem.setProduto(produto);
            novoItem.setQuantidade(itemDto.getQuantidade());
            novoItem.setPreco(produto.getPreco());
            novoItem.setPedido(pedido);
            pedido.getItens().add(novoItem);
            BigDecimal valorAdicional = produto.getPreco().multiply(BigDecimal.valueOf(itemDto.getQuantidade()));
            pedido.setTotal(pedido.getTotal().add(valorAdicional));
        }

        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        return new PedidoResponseDto(pedidoSalvo);
    }

    @Transactional
    public PedidoResponseDto fecharPedidoMesa(Integer pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + pedidoId));
        pedido.setStatus(StatusPedido.ENTREGUE);
        Mesa mesa = pedido.getMesa();

        if (mesa != null) {
            List<StatusPedido> statusesFinalizados = List.of(StatusPedido.PAGO, StatusPedido.ENTREGUE, StatusPedido.CANCELADO);
            long pedidosPendentes = pedidoRepository.countByMesaAndStatusNotIn(mesa, statusesFinalizados);
            if (pedidosPendentes == 0) {
                mesa.setStatus(StatusMesa.LIVRE);
                mesaRepository.save(mesa);
            }
        }

        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        return new PedidoResponseDto(pedidoSalvo);
    }

    /**
     * MÉTODO PRINCIPAL PARA O FECHAMENTO DE CAIXA.
     * Agora ele calcula o relatório corretamente, subtraindo as sangrias,
     * e depois limpa os dados do dia.
     */
    @Transactional
    public void fecharCaixa() {
        // 1. CALCULA E SALVA O RELATÓRIO FINAL DO DIA
       // processarRelatorioDoDia();

        // 2. <<< LÓGICA DE EXCLUSÃO CORRIGIDA >>>
        // Primeiro, apaga todos os dados "filhos" que dependem de 'pedido'
        itemPedidoRepository.deleteAllInBatch();
        pagamentoRepository.deleteAllInBatch(); // <<< ADICIONADO AQUI

        // Agora que não há mais dependências, apaga os "pais" (Pedido)
        pedidoRepository.deleteAllInBatch();

        // 3. REINICIA O CONTADOR DE ID DA TABELA DE PEDIDOS
        entityManager.createNativeQuery("ALTER SEQUENCE pedido_id_seq RESTART WITH 1").executeUpdate();

        // 4. RESETA O STATUS DE TODAS AS MESAS PARA LIVRE
        List<Mesa> todasAsMesas = mesaRepository.findAll();
        todasAsMesas.forEach(mesa -> mesa.setStatus(StatusMesa.LIVRE));
        mesaRepository.saveAll(todasAsMesas);
    }

    public List<RelatorioDiario> listarRelatorios() {
        // Este método não pertence mais aqui, deveria estar em RelatorioService.
        // Mas mantendo por enquanto para não quebrar seu controller.
            return relatorioDiarioRepository.findAll(Sort.by(Sort.Direction.DESC, "data"));
    }
    
    public List<PedidoResponseDto> buscarPedidosPorData(LocalDate data) {
        LocalDateTime inicioDoDia = data.atStartOfDay();
        LocalDateTime fimDoDia = data.atTime(23, 59, 59);

        return pedidoRepository.findByDataBetween(inicioDoDia, fimDoDia)
                .stream()
                .map(PedidoResponseDto::new)
                .collect(Collectors.toList());
    }
}