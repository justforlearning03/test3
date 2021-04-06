package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.web.bind.annotation.DeleteMapping;


import rva.jpa.Obrazovanje;
import rva.repository.ObrazovanjeRepository;

@RestController
@Api(tags = {"Obrazovanje CRUD operacije"})
public class ObrazovanjeRestController {

	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("obrazovanje")
	@ApiOperation(value="Vraća kolekciju vrsta obrazovanja")
	public Collection<Obrazovanje> getObrazovanje(){
		return obrazovanjeRepository.findAll();
	}
	@GetMapping("obrazovanje/{id}")
	@ApiOperation(value="Vraća obrazovanje iz baze podataka čiji je ID prosleđen kao path varijabla")
	public Obrazovanje getObrazovanje(@PathVariable("id") Integer id) {
		return obrazovanjeRepository.getOne(id);
	}
	@DeleteMapping("obrazovanje/{id}")
	@ApiOperation(value="Briše obrazovanje iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Obrazovanje> deleteObrazovanje(@PathVariable ("id") Integer id){
		if(!obrazovanjeRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from radnik where obrazovanje=" +id);
		obrazovanjeRepository.deleteById(id);
		
		if (id == -100) {
			jdbcTemplate.execute("INSERT INTO obrazovanje (\"id\", \"naziv\", \"stepen_strucne_spreme\", \"opis\") "
					+ "VALUES (-100, 'test', 'ASDF', 'test opis') ");
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("obrazovanje")
	@ApiOperation(value="Dodaje novo obrazovanje u bazu")
	public ResponseEntity<Obrazovanje> insertObrazovanje(@RequestBody Obrazovanje obrazovanje){
		if(!obrazovanjeRepository.existsById(obrazovanje.getId())) {
			obrazovanjeRepository.save(obrazovanje);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("obrazovanje")
	@ApiOperation(value="Vrši update obrazovanja iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Obrazovanje> updateObrazovanje(@RequestBody Obrazovanje obrazovanje){
		if(!obrazovanjeRepository.existsById(obrazovanje.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		obrazovanjeRepository.save(obrazovanje);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	
}
