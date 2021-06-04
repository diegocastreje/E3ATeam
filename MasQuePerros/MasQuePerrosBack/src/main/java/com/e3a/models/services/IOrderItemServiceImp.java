package com.e3a.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e3a.models.dao.IOrderItemDao;

@Service
public class IOrderItemServiceImp implements IOrderItemService {

	@Autowired
	private IOrderItemDao orderItemDao;
	
	@Override
	public long countOrderItem() {
		return orderItemDao.countOrderItem();
	}

}
