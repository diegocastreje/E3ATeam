package com.e3a.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e3a.models.dao.IPaymentMethodDao;
import com.e3a.models.entity.PaymentMethod;


@Service
public class IPaymentMethodServiceImpl implements IPaymentMethodService {
	
	 @Autowired
	 private IPaymentMethodDao paymentMethodDao;
	
	
	@Override
	@Transactional(readOnly=true)
	public List<PaymentMethod> findAllPaymentMethods() {
		
		return paymentMethodDao.findAllPaymentMethods();
	}


	@Override
	@Transactional (readOnly=true)
	public List<PaymentMethod> findByDescription(String term) {
		return paymentMethodDao.findByDescription(term);
	}



}
