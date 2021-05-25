package com.e3a.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e3a.models.entity.PaymentMethod;


public interface IPaymentMethodDao extends JpaRepository<PaymentMethod, Long>{

	@Query("from PaymentMethod")
	public List<PaymentMethod> findAllPaymentMethods();
}
