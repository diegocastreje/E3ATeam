package com.e3a.models.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e3a.models.entity.Item;
import com.e3a.models.entity.Role;
import com.e3a.models.entity.User;



public interface IRoleDao  extends JpaRepository<Role, Long>{
		
	//@Query("from Role r where r.role_id = ?")
	//public Role findById(Long id);
	
	@Query("from Role")
	public List<Role> findAllRoles();
	
	public List<Role> findByName(String term);
}
