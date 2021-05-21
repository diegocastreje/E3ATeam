package com.e3a.controllers;

import com.e3a.models.entity.User;
import com.e3a.models.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserRestController {

    @Autowired
    private IUserService userService;

    @GetMapping("/users")
    public List<User> index() {
        return userService.findAll();

    }
    
    @PutMapping("/users/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody User user, BindingResult result, @PathVariable Long id) {
		
		User userActual = userService.findById(id);
		User userUpdated = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = new ArrayList<>();
			for(FieldError err: result.getFieldErrors()) {
				errors.add("El campo '" + err.getField() + "' " + err.getDefaultMessage());
			}
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(userActual == null) {
			response.put("mensaje", "Error, no se pudo editar, el usuario ID:".concat(id.toString().concat(" no existe en la base de datos!")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			
			userActual.setUsername(user.getUsername());
			userActual.setPassword(user.getPassword());
			userActual.setFirst_name(user.getFirst_name());
			userActual.setMiddle_name(user.getMiddle_name());
			userActual.setLast_name(user.getLast_name());
			userActual.setBirth_date(user.getBirth_date());
			userActual.setEmail(user.getEmail());
			userActual.setRole(user.getRole());
			userActual.setPayment_method(user.getPayment_method());
		
		userUpdated = userService.save(userActual);
		
		}catch(DataAccessException e){
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje","El usuario ha sido actualizado con éxito");
		response.put("cliente", userUpdated);
		
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED); 
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			
			User user = userService.findById(id);
			
			userService.delete(id);
			
		}catch(DataAccessException e){
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El usuario ha sido eliminado con éxito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
    
}
