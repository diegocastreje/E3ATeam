package com.e3a.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class PaymentMethod implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	private long paymentId;
	@Column(nullable=false)
	private String description;
	
	public PaymentMethod() {}

	public long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(long paymentId) {
		this.paymentId = paymentId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
