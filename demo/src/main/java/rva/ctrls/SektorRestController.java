package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Preduzece;
import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.repository.RadnikRepository;
import rva.repository.SektorRepository;

@RestController
@Api(tags = {"Sektor CRUD operacije"})
public class SektorRestController {

	@Autowired
	private SektorRepository sektorRepository;
	
	@Autowired
	private RadnikRepository radnikRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("sektor")
	@ApiOperation(value="Vraća kolekciju svih sektora iz baze podataka")
	public Collection<Sektor> getSektor(){
		return sektorRepository.findAll();
	}
	@GetMapping("sektor/{id}")
	@ApiOperation(value="Vraća sektor iz baze podataka čiji je ID prosleđen kao path varijabla")
	public Sektor getSektor(@PathVariable("id") Integer id) {
		return sektorRepository.getOne(id);
	}
	
	@DeleteMapping("sektor/{id}")
	@ApiOperation(value="Briše sektor iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Preduzece> deleteSektor(@PathVariable ("id") Integer id){
		if(!sektorRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from radnik where sektor=" +id);
		sektorRepository.deleteById(id);
		
		if (id == -100)
			jdbcTemplate.execute(
			" INSERT INTO \"sektor\"(\"id\", \"naziv\", \"oznaka\", \"preduzece\")" 
			+ " VALUES (-100, 'test', 'delete',4) ");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("sektor")
	@ApiOperation(value="Dodaje novi sektor u bazu")
	public ResponseEntity<Sektor> insertSektor(@RequestBody Sektor sektor){
		if(!sektorRepository.existsById(sektor.getId())) {
			sektorRepository.save(sektor);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("sektor")
	@ApiOperation(value="Vrši update sektora iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Sektor> updateSektor(@RequestBody Sektor sektor){
		if(!sektorRepository.existsById(sektor.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		sektorRepository.save(sektor);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping(value = "RadniciZaSektorId/{id}")
	@ApiOperation(value="Vraća kolekciju radnika koji se nalaze u sektoru čiji je id prosleđen kao path varijabla")
	public Collection<Radnik> RadniciZaSektorId(@PathVariable("id") int id){
		Sektor s = sektorRepository.getOne(id);
		return radnikRepository.findBySektor(s);
	}
	
	
	
	
	
}
