package com.e3a.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="payment_methods")
public class PaymentMethod implements Serializable{

	@Id
	private long payment_id;
	//@Column(nullable=false)
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
	
	private static final long serialVersionUID = 1L;
}
