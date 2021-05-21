package com.e3a.models.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="order_items")
public class OrderItem implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long order_item_id;
	
	private int amount;
	
	private double price;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="item_id")
	private Item item;

	public OrderItem(long order_item_id, int amount, double price, Item item) {
		super();
		this.order_item_id = order_item_id;
		this.amount = amount;
		this.price = price;
		this.item = item;
	}

	public long getOrder_item_id() {
		return order_item_id;
	}

	public void setOrder_item_id(long order_item_id) {
		this.order_item_id = order_item_id;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}
	
	private static final long serialVersionUID = 1L;
}
