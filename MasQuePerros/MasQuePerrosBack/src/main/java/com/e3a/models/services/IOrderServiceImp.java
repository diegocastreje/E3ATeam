package com.e3a.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e3a.models.dao.IOrderDao;
import com.e3a.models.entity.Order;

@Service
public class IOrderServiceImp implements IOrderService {

	@Autowired
	private IOrderDao orderDao;
	
	@Override
	public long countOrder() {
		return orderDao.countOrder();
	}

	@Override
	public void save(Order order) {
		orderDao.save(order);
	}

}
