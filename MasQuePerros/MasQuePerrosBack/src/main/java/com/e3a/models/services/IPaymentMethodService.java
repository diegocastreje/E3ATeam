package com.e3a.models.services;

import java.util.List;

import com.e3a.models.entity.PaymentMethod;


public interface IPaymentMethodService {

	public List<PaymentMethod>findAllPaymentMethods();
	
	public List<PaymentMethod>findByDescription(String term);
}
