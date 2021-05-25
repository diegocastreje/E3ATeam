package com.e3a.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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




@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "*"})
public class ItemRestController {
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IItemService itemService;

	@Autowired
	private IUploadFileService uploadFService;
	
	@GetMapping("/orders/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public Order show(@PathVariable Long id) {
		return userService.findOrderById(id);
	} 

	@DeleteMapping("/orders/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		userService.deleteOrderById(id);
	}

	@GetMapping("/orders/filter-items/{term}")
	@ResponseStatus(code = HttpStatus.OK)
	public List<Item> filtrarProductos(@PathVariable String term){
		return itemService.findItemByName(term);
	}
	
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
	
	
	//Este metodo corresponde al de subir imagen que iria en el ItemRestController (no esta testeado porq noestaba la clase creada caudn se creo este metodo, avisar a niqui si algo falla)
	@PostMapping("/items/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile archivo, @RequestParam("id") Long id){
		Map<String , Object> response = new HashMap<String, Object>();
		
		Item item = itemService.findById(id);
		
		if(!archivo.isEmpty()) {
			String fileName=null;
			try {
				fileName =  uploadFService.copi(archivo);
			} catch (IOException e) {
				response.put("mensaje","Error al realizar subir la imagen");
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String previousFileName = item.getPicture();
			
			uploadFService.delete(previousFileName);
			
			item.setPicture(fileName);
			itemService.save(item);
			response.put("item", item);
			response.put("mensaje", "Has subido correctamente la imagen: "+fileName);
		}
		
		return new ResponseEntity<Map>(response, HttpStatus.CREATED);
	}
	@GetMapping("/uploads/img/{pictureName:.+}")
	public ResponseEntity<Resource> viewPicture(@PathVariable String pictureName){
		
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
