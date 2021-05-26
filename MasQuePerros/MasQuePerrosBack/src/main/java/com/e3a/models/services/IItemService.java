package com.e3a.models.services;

import java.util.List;

import com.e3a.models.entity.Item;
import com.e3a.models.entity.Order;
import com.e3a.models.entity.User;

public interface IItemService {
	
	public List<Item> findAll();
	
	public Item save(Item item);
	
	public void delete(Long id);
	
	public Item findById(Long id);
	
	public List<Item> findItemByName(String term);
	
}
