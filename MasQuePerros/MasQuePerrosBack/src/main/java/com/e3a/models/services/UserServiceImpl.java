package com.e3a.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e3a.models.dao.IItemDao;
import com.e3a.models.dao.IOrderDao;
import com.e3a.models.dao.IRoleDao;
import com.e3a.models.dao.IUserDao;
import com.e3a.models.entity.Item;
import com.e3a.models.entity.Order;
import com.e3a.models.entity.Role;
import com.e3a.models.entity.User;

@Service
public class UserServiceImpl implements IUserService{
	
	 @Autowired
	 private IUserDao userDao;
	 
	 @Autowired
	 private IOrderDao orderDao;
	
	 @Autowired
	 private IItemDao itemDao;
  

	@Override
	public User findByUsername(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	@Transactional(readOnly=true)
	public List<User> findAll() {
		return (List<User>) userDao.findAll();
	}

	@Override
	public User save(User user) {
		return userDao.save(user);
	}

	@Override
	public void delete(Long id) {
		userDao.deleteById(id);
	}

	@Override
	public User findById(Long id) {
		return userDao.findById(id).orElse(null);
	}

	@Override
	@Transactional (readOnly=true)
	public Order findOrderById(Long id) {
		return orderDao.findById(id).orElse(null);
	}

	@Override
	@Transactional 
	public Order saveOrder(Order order) {
		return orderDao.save(order);
	}

	@Override
	@Transactional 
	public void deleteOrderById(Long id) {
		orderDao.deleteById(id);
	}


	@Override
	public List<Order> findOrderByUserId(Long id) {
		return orderDao.findByUser(id);
	}

}
