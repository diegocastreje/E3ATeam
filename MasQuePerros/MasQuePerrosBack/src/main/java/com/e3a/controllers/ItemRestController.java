package com.e3a.controllers;

import java.io.Console;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e3a.models.entity.Item;
import com.e3a.models.entity.Order;
import com.e3a.models.services.IItemService;
import com.e3a.models.services.IUploadFileService;
import com.e3a.models.services.IUserService;
import com.e3a.utilities.Reader;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "*"})
public class ItemRestController {
	
	private Reader reader= new Reader();
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IItemService itemService;

	@Autowired
	private IUploadFileService uploadFService;

	@Secured({"ROLE_ADMIN", "ROLE_CLERK", "ROLE_CLIENT"})
	@GetMapping("/orders/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public Order show(@PathVariable Long id) {
		return userService.findOrderById(id);
	}

	@Secured({"ROLE_ADMIN", "ROLE_CLERK", "ROLE_CLIENT"})
	@DeleteMapping("/orders/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		userService.deleteOrderById(id);
	}

	@Secured({"ROLE_ADMIN", "ROLE_CLERK", "ROLE_CLIENT"})
	@GetMapping("/orders/filter-items/{term}")
	@ResponseStatus(code = HttpStatus.OK)
	public List<Item> filtrarProductos(@PathVariable String term){
		return itemService.findItemByName(term);
	}

	@Secured({"ROLE_ADMIN", "ROLE_CLERK", "ROLE_CLIENT"})
	@PostMapping("/orders")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Order crear(@RequestBody Order factura) {
		return userService.saveOrder(factura);
	}

	@GetMapping("/items")
	@ResponseStatus(code = HttpStatus.OK)
	public List<Item> index() {
		return itemService.findAll();
	}

	@Secured({"ROLE_ADMIN", "ROLE_CLERK"})
	@PostMapping("/items")
	public ResponseEntity<?> create(@Valid @RequestBody Item  item, BindingResult result) {

		Item itemNew =null;
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
				itemNew = itemService.save(item);
			}catch(DataAccessException e) {
				response.put(reader.getString("message"),reader.getString("queryError"));
				response.put(reader.getString("error"), e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map>(response, HttpStatus.INTERNAL_SERVER_ERROR);

			}
			response.put(reader.getString("message"), reader.getString("itemCreated"));
			response.put(reader.getString("item"), itemNew);
			return new ResponseEntity<Map>(response, HttpStatus.CREATED);

		}
	}

	@Secured({"ROLE_ADMIN", "ROLE_CLERK"})
	@PutMapping("/items/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Item item, BindingResult result, @PathVariable long id) {
		
		Item itemActual = itemService.findById(id);
		Item itemUpdated = null;
		
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
				
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(itemActual == null) {
			response.put("mensaje", "Error: no se puede editar, el cliente con ID: ".concat(id + "".concat(" no existe en la base de datos.")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			itemActual.setName(item.getName());
			itemActual.setAmount(item.getAmount());
			itemActual.setPrice(item.getPrice());
			itemActual.setCategory(item.getCategory());
			itemActual.setDescription(item.getDescription());
			
			itemUpdated = itemService.save(itemActual);
		} catch (Exception e) {
			response.put("mensaje", "Error al actualizar el item en la base de datos.");
			response.put("error", e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		response.put("mensaje", "El item ha sido actualizado con éxito.");
		response.put("item", itemUpdated);
	
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	@Secured({"ROLE_ADMIN", "ROLE_CLERK"})
    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            
            Item item = itemService.findById(id);
            String nombreFotoAnterior = item.getPicture();
            
            uploadFService.delete(nombreFotoAnterior);
            
            itemService.deleteOrderItem(id);
            itemService.delete(id);
            
        }catch(DataAccessException e){
            response.put("mensaje", "Error al eliminar en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El item ha sido eliminado con éxito");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
	@Secured({"ROLE_ADMIN", "ROLE_CLERK"})
	@GetMapping("/items/{id}")
	public ResponseEntity<?> showItem(@PathVariable Long id) {
		
		Item item = null;
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			item = itemService.findById(id);
		} catch (Exception e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos.");
			response.put("error", e.getMessage().concat(": ").concat(e.getLocalizedMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(item == null) {
			response.put("mensaje", "El item con ID: ".concat(id.toString().concat(" no existe en la base de datos.")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Item>(item, HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN", "ROLE_CLERK"})
	@PostMapping("/items/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile archivo, @RequestParam("id") long id){
		Map<String , Object> response = new HashMap<String, Object>();
		
		Item item = itemService.findById(id);
		
		if(!archivo.isEmpty()) {
			String fileName=null;
			try {
				fileName =  uploadFService.copi(archivo);
			} catch (IOException e) {
				response.put(reader.getString("message"),reader.getString("message"));
				response.put(reader.getString("error"), e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String previousFileName = item.getPicture();
			
			uploadFService.delete(previousFileName);
			
			item.setPicture(fileName);
			itemService.save(item);
			response.put(reader.getString("item"), item);
			response.put(reader.getString("message"), reader.getString("uploadImgSucc")+fileName);
		}
		
		return new ResponseEntity<Map>(response, HttpStatus.CREATED);
	}

	@GetMapping({"/uploads/img/{pictureName:.+}", "/uploads/img/"})
	public ResponseEntity<Resource> viewPicture(@PathVariable(required = false) String pictureName) throws IOException{
		
		Resource recurso = null;
		
		try {
			recurso=uploadFService.charge(pictureName);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		HttpHeaders cabecera = new HttpHeaders();
		
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+recurso.getFilename()+"\"");
		
		return new ResponseEntity<Resource>(recurso,cabecera, HttpStatus.OK);
		
	}
	
}
