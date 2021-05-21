package com.e3a.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.Item;

public interface IItemDao extends CrudRepository<Item, Long>{
	
	public List<Item> findByName(String term);
	
	public List<Item> findByNameContainingIgnoreCase(String term);
	
	public List<Item> findByNameStartingWithIgnoreCase(String term);
}
