package com.e3a.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.Order;

public interface IOrderDao extends CrudRepository<Order, Long> {
	
}