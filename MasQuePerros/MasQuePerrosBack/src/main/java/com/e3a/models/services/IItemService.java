package com.e3a.models.services;

import java.util.List;

import com.e3a.models.entity.Item;
import com.e3a.models.entity.Order;
import com.e3a.models.entity.OrderItem;
import com.e3a.models.entity.User;

public interface IItemService {
	
	public List<Item> findAll();
	
	public Item save(Item item);
	
	public OrderItem saveOrderItem(OrderItem orderItem);
	
	public void delete(long id);
	
	public Item findById(long id);
	
	public List<Item> findItemByName(String term);
	
	public void deleteOrderItem(long item_id);
	
}
