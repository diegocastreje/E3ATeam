package com.e3a.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.OrderItem;

public interface IOrderItemDao extends CrudRepository<OrderItem, Long>{
	
	
	@Query("FROM OrderItem o WHERE o.item.item_id LIKE ?1")
	public List<OrderItem> findByItemId(long term);
}
