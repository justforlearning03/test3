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
import rva.repository.PreduzeceRepository;

@RestController
@Api(tags = {"Preduzeće CRUD operacije"})
public class PreduzeceRestController {

	@Autowired
	private PreduzeceRepository preduzeceRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("preduzece")
	@ApiOperation(value="Vraća kolekciju svih preduzeća iz baze podataka")
	public Collection<Preduzece> getPreduzece(){
		return preduzeceRepository.findAll();
	}
	@GetMapping("preduzece/{id}")
	@ApiOperation(value="Vraća preduzeće iz baze podataka čiji je ID prosleđen kao path varijabla")
	public Preduzece getPreduzece(@PathVariable("id") Integer id) {
		return preduzeceRepository.getOne(id);
	}
	@DeleteMapping("preduzece/{id}")
	@ApiOperation(value="Briše preduzeće iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Preduzece> deletePreduzece(@PathVariable ("id") Integer id){
		if(!preduzeceRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from sektor where preduzece=" +id);
		preduzeceRepository.deleteById(id);
		
		if (id == -100) {
			jdbcTemplate.execute("INSERT INTO preduzece (\"id\", \"naziv\", \"pib\", \"sediste\", \"opis\") "
												 + "VALUES (-100, 'test', '123', 'test', 'test') ");
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("preduzece")
	@ApiOperation(value="Dodaje novo preduzeće u bazu")
	public ResponseEntity<Preduzece> insertPreduzece(@RequestBody Preduzece preduzece){
		if(!preduzeceRepository.existsById(preduzece.getId())) {
			preduzeceRepository.save(preduzece);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("preduzece")
	@ApiOperation(value="Vrši update preduzeća iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Preduzece> updatePreduzece(@RequestBody Preduzece preduzece){
		if(!preduzeceRepository.existsById(preduzece.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		preduzeceRepository.save(preduzece);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("preduzeceNaziv/{naziv}")
	@ApiOperation(value="Vraća kolekciju svih preduzeća iz baze podataka čije ime sadrži u sebi string koji je prosleđen kao path varijabla")
	public Collection<Preduzece> getPreduzeceByNaziv(@PathVariable("naziv") String naziv) {
		return preduzeceRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
}
