package br.com.sampaiollo.pzsmp.repository;

import br.com.sampaiollo.pzsmp.entity.SequenciadorPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SequencienciadorPedidoRepository extends JpaRepository<SequenciadorPedido, Long> {
}
