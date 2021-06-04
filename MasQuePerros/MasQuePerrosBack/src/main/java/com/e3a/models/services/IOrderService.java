package com.e3a.models.services;

import com.e3a.models.entity.Order;

public interface IOrderService {
	public long countOrder();
	
	public void save(Order order);
}
