package com.e3a.models.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="items")
public class Item implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long item_id;
	
	private String name;
	
	private String description;
	
	private int amount;
	
	private String picture;
	
	private double price;
	
	private String category;

	public Item(long item_id, String name, String description, int amount, String picture, double price, String category) {
		super();
		this.item_id = item_id;
		this.name = name;
		this.description = description;
		this.amount = amount;
		this.picture = picture;
		this.price = price;
		this.category = category;
	}

	public long getItem_id() {
		return item_id;
	}

	public void setItem_id(long item_id) {
		this.item_id = item_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	private static final long serialVersionUID = 1L;
}
