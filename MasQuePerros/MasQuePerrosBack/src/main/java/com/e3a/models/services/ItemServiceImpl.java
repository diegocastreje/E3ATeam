package com.e3a.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e3a.models.dao.IItemDao;
import com.e3a.models.entity.Item;

@Service
public class ItemServiceImpl implements IItemService{

	@Autowired
	 private IItemDao itemDao;
	
	
	@Override
	@Transactional (readOnly=true)
	public List<Item> findAll() {
		// TODO Auto-generated method stub
		return (List<Item>) itemDao.findAll();
	}

	@Override
	public Item save(Item item) {
		// TODO Auto-generated method stub
		return itemDao.save(item);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		itemDao.deleteById(id);
	}

	@Override
	@Transactional (readOnly=true)
	public Item findById(Long id) {
		// TODO Auto-generated method stub
		return itemDao.findById(id).orElse(null);
	}

	@Override
	@Transactional (readOnly=true)
	public List<Item> findItemByName(String term) {
		// TODO Auto-generated method stub
		return itemDao.findByNameContainingIgnoreCase(term);
	}

}
