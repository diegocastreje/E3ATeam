package com.e3a.models.services;

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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService ,UserDetailsService{

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private IUserDao userDao;

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
    public List<User> findAll() {
        return (List<User>) userDao.findAll();
    }

    @Override
    public User save(User user) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public User findById(Long id) {
        return null;
    }

    @Override
    public Order findOrderById(Long id) {
        return null;
    }

    @Override
    public Order saveOrder(Order order) {
        return null;
    }

    @Override
    public void deleteOrderById(Long id) {

    }

    @Override
    public List<Order> findOrderByUserId(Long id) {
        return null;
    }
}
