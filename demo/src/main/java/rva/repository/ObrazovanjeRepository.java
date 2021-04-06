package rva.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import rva.jpa.Obrazovanje;

public interface ObrazovanjeRepository extends JpaRepository<Obrazovanje, Integer> {
	
	Collection<Obrazovanje> findByNazivContainingIgnoreCase(String naziv);

}
