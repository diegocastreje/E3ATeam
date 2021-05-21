package com.e3a.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="users")
public class User implements Serializable{
	
	@Id
	private String nie;	
	@NotEmpty(message = "This field can not be empty")
	@Size(min=4, max=20, message="This field should have beetween 4 and 20 characters")
	@Column(unique = true)
	private String username;
	@NotEmpty(message = "This field can not be empty")
	@Column(length = 60)
	private String password;
	@NotEmpty(message = "This field can not be empty")
	@Column(length = 20)
	private String first_name;
	@Column(length = 20)
	private String middle_name;
	@Column(length = 20)
	private String last_name;
	@NotEmpty(message = "This field can not be empty")
	@Column
	private Date birth_date;
	@NotEmpty(message = "This field can not be empty")
	@Column(unique = true,length = 50)
	@Email
	private String email;
	@Column
	private boolean first_access; //true->first access / false->not first access
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="role_id", foreignKey = @ForeignKey(name="fk_role"))
	private Role role;
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="payment_id", foreignKey = @ForeignKey(name="fk_paymentMethod"))
	private PaymentMethod payment_method;
	
	public User() {}
	
	public String getNie() {
		return nie;
	}

	public void setNie(String nie) {
		this.nie = nie;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getMiddle_name() {
		return middle_name;
	}

	public void setMiddle_name(String middle_name) {
		this.middle_name = middle_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public Date getBirth_date() {
		return birth_date;
	}

	public void setBirth_date(Date birth_date) {
		this.birth_date = birth_date;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isFirst_access() {
		return first_access;
	}

	public void setFirst_access(boolean first_access) {
		this.first_access = first_access;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public PaymentMethod getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(PaymentMethod payment_method) {
		this.payment_method = payment_method;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	private static final long serialVersionUID = 1L;
}
