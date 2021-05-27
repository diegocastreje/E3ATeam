package com.e3a.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e3a.models.dao.IRoleDao;
import com.e3a.models.entity.Role;

@Service
public class IRoleServiceImpl implements IRoleService{
	

	@Autowired
	private IRoleDao roleDao;
	

	@Override
	@Transactional (readOnly=true)
	public List<Role> findAllRoles() {
		
		return roleDao.findAll();
	}


	@Override
	@Transactional (readOnly=true)
	public List<Role> findByName(String term) {
		// TODO Auto-generated method stub
		return roleDao.findByName(term);
	}

}
