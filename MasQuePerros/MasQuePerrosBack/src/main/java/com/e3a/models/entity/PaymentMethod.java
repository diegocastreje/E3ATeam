package com.e3a.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class PaymentMethod implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	private long payment_id;
	@Column(nullable=false)
	private String description;
	
	public PaymentMethod() {}

	public long getPayment_id() {
		return payment_id;
	}

	public void setPayment_id(long payment_id) {
		this.payment_id = payment_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
