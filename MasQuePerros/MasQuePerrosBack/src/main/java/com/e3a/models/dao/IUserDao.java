package com.e3a.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.e3a.models.entity.User;

public interface IUserDao extends CrudRepository<User, Long> {

	public User findByUsername(String User);
}
