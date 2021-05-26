package com.e3a.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.Role;
import com.e3a.models.entity.User;

public interface IUserDao extends JpaRepository<User, Long> {

	public User findByUsername(String User);
	
}
