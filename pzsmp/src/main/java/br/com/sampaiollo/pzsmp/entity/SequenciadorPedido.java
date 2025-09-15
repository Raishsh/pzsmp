package br.com.sampaiollo.pzsmp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sequenciador_pedido")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SequenciadorPedido {

    @Id
    private Long id; // usaremos sempre ID=1

    @Column(name = "proximo_numero", nullable = false)
    private Integer proximoNumero;
}
