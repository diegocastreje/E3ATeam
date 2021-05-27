package com.e3a.models.services;

import java.util.List;

import com.e3a.models.entity.Role;

public interface IRoleService {

	public List<Role>findAllRoles();

	public List<Role>findByName(String term);
}
