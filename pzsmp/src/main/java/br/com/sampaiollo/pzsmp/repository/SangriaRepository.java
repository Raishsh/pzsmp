package br.com.sampaiollo.pzsmp.repository;

import br.com.sampaiollo.pzsmp.entity.Sangria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query; // <<< IMPORTE
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal; // <<< IMPORTE
import java.time.LocalDateTime;

@Repository
public interface SangriaRepository extends JpaRepository<Sangria, Long> {
    @Query("SELECT COALESCE(SUM(s.valor), 0) FROM Sangria s WHERE s.data BETWEEN :inicioDoDia AND :fimDoDia")
    BigDecimal sumValorByDataBetween(@Param("inicioDoDia") LocalDateTime inicioDoDia, @Param("fimDoDia") LocalDateTime fimDoDia);
}