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
import rva.repository.RadnikRepository;

@RestController
@Api(tags = {"Radnik CRUD operacije"})
public class RadnikRestController {

	@Autowired
	private RadnikRepository radnikRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("radnik")
	@ApiOperation(value="Vraća kolekciju svih radnika iz baze podataka")
	public Collection<Radnik> getRadnici(){
		return radnikRepository.findAll();
	}
	@GetMapping("radnik/{id}")
	@ApiOperation(value="Vraća radnika iz baze podataka čiji je ID prosleđen kao path varijabla")
	public Radnik getRadnik(@PathVariable("id") Integer id) {
		return radnikRepository.getOne(id);
	}
	@GetMapping("radnikIme/{ime}")
	@ApiOperation(value="Vraća kolekciju svih radnika iz baze podataka čije ime sadrži u sebi string koji je prosleđen kao path varijabla")
	public Collection<Radnik> getRadnikByIme(@PathVariable("ime") String ime) {
		return radnikRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@DeleteMapping("radnik/{id}")
	@ApiOperation(value="Briše radnika iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Preduzece> deleteRadnik(@PathVariable ("id") Integer id){
		if(!radnikRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		radnikRepository.deleteById(id);

		if (id == -100)
			jdbcTemplate.execute(
			" INSERT INTO \"radnik\"(\"id\", \"ime\", \"prezime\", \"broj_lk\",\"obrazovanje\", \"sektor\")" 
			+ " VALUES (-100, 'test', 'delete insert',123123, 1, 2) ");

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("radnik")
	@ApiOperation(value="Dodaje novog radnika u bazu")
	public ResponseEntity<Radnik> insertRadnik(@RequestBody Radnik radnik){
		if(!radnikRepository.existsById(radnik.getId())) {
			radnikRepository.save(radnik);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("radnik")
	@ApiOperation(value="Vrši update radnika iz baze podataka čiji je ID prosleđen kao path varijabla")
	public ResponseEntity<Radnik> updateRadnik(@RequestBody Radnik radnik){
		if(!radnikRepository.existsById(radnik.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		radnikRepository.save(radnik);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	

	
	
}




