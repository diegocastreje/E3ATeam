package com.e3a.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.Order;
import com.e3a.models.entity.PaymentMethod;
import com.e3a.models.entity.Role;


public interface IPaymentMethodDao  extends CrudRepository<PaymentMethod, Long> {
	@Query("from PaymentMethod")
	public List<PaymentMethod> findAllPaymentMethods();
	
	public List<PaymentMethod> findByDescription(String term);
}
