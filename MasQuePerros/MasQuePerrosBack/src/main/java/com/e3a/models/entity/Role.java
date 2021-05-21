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
	private long rol_id;
	@Column(unique = true,length = 20)
	private String name;
	
	public Role() {}

	public Role(long rol_id, String name) {
		super();
		this.rol_id = rol_id;
		this.name = name;
	}

	public long getRol_id() {
		return rol_id;
	}

	public void setRol_id(long rol_id) {
		this.rol_id = rol_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private static final long serialVersionUID = 1L;
}
