package com.e3a.controllers;

import com.e3a.models.dao.IPaymentMethodDao;
import com.e3a.models.entity.Item;
import com.e3a.models.entity.Order;
import com.e3a.models.entity.PaymentMethod;
import com.e3a.models.entity.Role;
import com.e3a.models.entity.User;
import com.e3a.models.services.IPaymentMethodService;
import com.e3a.models.services.IRoleService;
import com.e3a.models.services.IUserService;
import com.e3a.utilities.Reader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "*"})
public class UserRestController {

	private Reader reader= new Reader();
	
    @Autowired
    private IUserService userService;
    
    @Autowired
    private IPaymentMethodService paymentMethodService;

    @Autowired
    private IRoleService roleService;

    @GetMapping("/users")
    public List<User> index() {
        return userService.findAll();
    }

	@GetMapping("/users/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		User user = null;
		Map<String, Object> response = new HashMap<>();
		try {
			user = userService.findById(id);
		} catch(DataAccessException e) {
			response.put(reader.getString("message"),reader.getString("queryError"));
			response.put(reader.getString("error"), e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if(user == null) {
			response.put(reader.getString("message"), "El usuario ID:".concat(id.toString().concat(" no existe en la base de datos.")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
    
	@PostMapping("/users")
	public ResponseEntity<?> create(@Valid @RequestBody User  user, BindingResult result) {
		User userNew =null;
		Map<String , Object> response = new HashMap();
		
		if(result.hasErrors()) {
            
            List<String> errors = new ArrayList<>();
            for(FieldError err: result.getFieldErrors()) {
                System.out.println(reader.getString("field")+" '" + err.getField() + "' " + err.getDefaultMessage());
                errors.add(reader.getString("field")+" '" + err.getField() + "' " + err.getDefaultMessage());
            }
            
            response.put(reader.getString("error"), errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        else {
			
			try {
				
				System.out.println(user.toString());
				Role roleFinal =null;
				List<Role> roles = roleService.findByName(user.getRole().getName());
				roleFinal = roles.get(0);
				System.out.println(roleFinal);
				List<PaymentMethod> payments = paymentMethodService.findByDescription(user.getPayment_method().getDescription());
				PaymentMethod paymentFinal =payments.get(0);
				
//				System.out.println(user.getRole().getRole_id());
//				Long idRole = user.getRole().getRole_id();
//				System.out.println("El id del rol es="+idRole);
//				List<Role> roles = roleService.findAllRoles();
//				Role roleFinal =null;
//	 			for (Role role : roles) {
//					if(role.getRole_id()==user.getRole().getRole_id()) {
//						roleFinal=user.getRole();
//					}
//				}
//				System.out.println(roleFinal);
//				
//				System.out.println(user.getPayment_method().getPayment_id());
//				Long idPaymetn = user.getPayment_method().getPayment_id();
//				System.out.println("El id del pago es="+idPaymetn);
//				List<PaymentMethod> payments = paymentMethodService.findAllPaymentMethods();
//				PaymentMethod paymentFinal =null;
//	 			for (PaymentMethod paymentMethod : payments) {
//					if(paymentMethod.getPayment_id()==user.getPayment_method().getPayment_id()) {
//						paymentFinal=user.getPayment_method();
//					}
//				}
//				System.out.println(paymentFinal);
			
				user.setRole(roleFinal);
				user.setPayment_method(paymentFinal);
				
				System.out.println(user);
				
				userNew = userService.save(user);
			}catch(DataAccessException e) {
				response.put(reader.getString("message"),reader.getString("queryError"));
				response.put(reader.getString("error"), e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
			}
			response.put(reader.getString("message"), reader.getString("userCreated"));
			response.put(reader.getString("user"), userNew);
			return new ResponseEntity<Map>(response, HttpStatus.CREATED);
			
			}
		}
    

    @PutMapping("/users/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody User user, BindingResult result, @PathVariable Long id) {
		
		User userActual = userService.findById(id);
		User userUpdated = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			
			List<String> errors = new ArrayList<>();
			for(FieldError err: result.getFieldErrors()) {
				errors.add(reader.getString("field")+" '" + err.getField() + "' " + err.getDefaultMessage());
			}
			
			response.put(reader.getString("error"), errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(userActual == null) {
			response.put(reader.getString("message"), reader.getString("errorUpdatingUser").concat(id.toString().concat(reader.getString("notInBBDD"))));
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
			response.put(reader.getString("message"),  reader.getString("errorUpdatingUser"));
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put(reader.getString("message"),reader.getString("userUpdated"));
		response.put(reader.getString("user"), userUpdated);
		
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED); 
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			userService.delete(id);
		}catch(DataAccessException e){
			response.put(reader.getString("message"), reader.getString("errorDeletingUser"));
			response.put(reader.getString("error"), e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put(reader.getString("message"), reader.getString("userDeleted"));
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	

}
