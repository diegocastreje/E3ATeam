package com.e3a.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e3a.models.entity.Role;

public interface IRoleDao extends JpaRepository<Role, Long>{
	
	@Query("from Role")
	public List<Role> findAllRoles();
}
