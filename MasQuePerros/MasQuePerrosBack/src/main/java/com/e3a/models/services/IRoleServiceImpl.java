package com.e3a.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e3a.models.dao.IRoleDao;
import com.e3a.models.entity.Role;

@Service
public class IRoleServiceImpl implements IRoleService{
	

	 @Autowired
	 private IRoleDao roleDao;
	
	
//	@Override
//	public Role findByid(Long role_id) {
//		return roleDao.findById(role_id).orElse(null);
//	}


	@Override
	public List<Role> findAllRoles() {
		
		return roleDao.findAll();
	}


	@Override
	public List<Role> findByName(String term) {
		// TODO Auto-generated method stub
		return roleDao.findByName(term);
	}

}
