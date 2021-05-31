package com.e3a.models.services;

import com.e3a.models.dao.IOrderDao;
import com.e3a.models.dao.IRoleDao;
import com.e3a.models.dao.IUserDao;
import com.e3a.models.entity.Order;
import com.e3a.models.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService ,UserDetailsService{

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private IUserDao userDao;
    
    @Autowired
    private IOrderDao orderDao;
    
    @Autowired
    private IRoleDao roleDao;

    @Autowired
    private IOrderDao orderDao;

    @Autowired
    private IRoleDao roleDao;

    @Override
    @Transactional(readOnly=true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userDao.findByUsername(username);

        if (user == null) {
            logger.error("Login error: User "+username+" does not exists");
            throw new UsernameNotFoundException("Login error: User " + username + " does not exists");
        }

        List<GrantedAuthority> authorities = user.getRole().stream().map(role -> new SimpleGrantedAuthority(role.getName())).peek(authority -> logger.info("Role: " + authority.getAuthority())).collect(Collectors.toList());
/*        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole().getName());
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();*/

        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), user.isEnabled(), true, true, true, authorities);
    }

    @Override
    @Transactional(readOnly=true)
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    @Transactional(readOnly=true)
    public List<User> findAll() {
        return (List<User>) userDao.findAll();
    }

    @Override
    @Transactional(readOnly=false)
    public User save(User user) {
        return userDao.save(user);
    }

    @Override
    @Transactional(readOnly=false)
    public void delete(Long id) {
    	User user=userDao.findById((long) 1).orElse(null);
    	System.out.println(user.toString());
    	List<Order> orders = orderDao.findByUser(id);
    	for (Order order : orders) {
			order.setUser(user);
			saveOrder(order);
			System.out.println(order);
		}
    	
    	userDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly=true)
    public User findById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly=true)
    public Order findOrderById(Long id) {
        return orderDao.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly=false)
    public Order saveOrder(Order order) {
        return orderDao.save(order);
    }

    @Override
    @Transactional(readOnly=false)
    public void deleteOrderById(Long id) {
      
    	orderDao.deleteById(id);

    }

    @Override
    @Transactional(readOnly=true)
    public List<Order> findOrderByUserId(Long id) {
        return orderDao.findByUser(id);
    }
}
