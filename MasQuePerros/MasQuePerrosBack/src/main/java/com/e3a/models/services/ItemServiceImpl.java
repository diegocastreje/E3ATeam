package com.e3a.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e3a.models.dao.IItemDao;
import com.e3a.models.dao.IOrderItemDao;
import com.e3a.models.entity.Item;
import com.e3a.models.entity.OrderItem;

@Service
public class ItemServiceImpl implements IItemService{

	@Autowired
	 private IOrderItemDao orderItemDao;
	
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
		return itemDao.save(item);
	}

	@Override
	public void delete(long id) {
		itemDao.deleteById(id);
	}

	@Override
	@Transactional (readOnly=true)
	public Item findById(long id) {
		return itemDao.findById(id).orElse(null);
	}

	@Override
	@Transactional (readOnly=true)
	public List<Item> findItemByName(String term) {
		return itemDao.findByNameContainingIgnoreCase(term);
	}
	
	@Override
	public OrderItem saveOrderItem(OrderItem orderItem) {
		return orderItemDao.save(orderItem);
	}

	@Override
	@Transactional
	public void deleteOrderItem(long item_id) {
		
        Item item = itemDao.findById((long) 1).orElse(null);
        System.out.println(item.toString());
        List<OrderItem> orderItems = orderItemDao.findByItemId(item_id);
        
        for (OrderItem orderItem : orderItems) {
            orderItem.setItem(item);
            saveOrderItem(orderItem);
            System.out.println(orderItem);
        }    
		
	}



}
