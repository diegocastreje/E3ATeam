package com.e3a.models.services;

import java.util.List;

import com.e3a.models.entity.Item;
import com.e3a.models.entity.Order;
import com.e3a.models.entity.PaymentMethod;
import com.e3a.models.entity.Role;
import com.e3a.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
	
	//Falta añadir la paginacion
	
	public List<User> findAll();

	public Page<User> findAll(Pageable pageable);

	public User save(User user);
	
	public void delete(Long id);
	
	public User findById(Long id);
	
	public Order findOrderById(Long id);
	
	public Order saveOrder(Order order);
	
	public void deleteOrderById(Long id);
	
	public List<Role> findAllRoles();

	public List<PaymentMethod> findAllPaymentMethods();
	
}
