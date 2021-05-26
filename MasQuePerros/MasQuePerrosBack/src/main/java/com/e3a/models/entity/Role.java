package com.e3a.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="roles")
public class Role implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long role_id;
	
	@Column(unique = true,length = 20)
	private String name;
	
	public Role() {}

	public Role(long rol_id, String name) {
		super();
		this.role_id = rol_id;
		this.name = name;
	}

	public long getRole_id() {
		return role_id;
	}

	public void setRole_id(long rol_id) {
		this.role_id = rol_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "Role [role_id=" + role_id + ", name=" + name + "]";
	}

	private static final long serialVersionUID = 1L;
}
