package rva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Preduzece;

import java.util.Collection;

public interface PreduzeceRepository extends JpaRepository<Preduzece, Integer> {
	
	Collection<Preduzece> findByNazivContainingIgnoreCase(String naziv);

}
