package com.e3a.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.Order;

public interface IOrderDao extends CrudRepository<Order, Long> {

	@Query("from Order o where o.user.user_id = ?1 ")
	public List<Order> findByUser(long id);

	@Query("SELECT COUNT(o) FROM Order o")
	public long countOrder();
  
}
