package rva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Sektor;

import java.util.Collection;

public interface SektorRepository extends JpaRepository<Sektor, Integer> {

	Collection<Sektor>  findByNazivContainingIgnoreCase(String naziv);
	
}
