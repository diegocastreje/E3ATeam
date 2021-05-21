package com.e3a.models.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="users")
public class User implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	
	private String nie;	
	@NotEmpty(message = "This field can not be empty")
	@Size(min=4, max=20, message="This field should have beetween 4 and 20 characters")
	@Column(unique = true)
	private String user;
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
	@Column(unique = true,length = 20)
	@Email
	private String email;
	@Column
	private boolean first_access; //true->first access / false->not first access
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinTable(name = "user_role",joinColumns = @JoinColumn(name="nie")
	,inverseJoinColumns =@JoinColumn(name="role_id"),
	uniqueConstraints = {@UniqueConstraint(columnNames = {"nie","role_id"})})
	private List<Role> roles;
	
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="payment_method", foreignKey = @ForeignKey(name="fk_paymentMethod"))
	private List<PaymentMethod> payment_method;
	
	public User() {}
	
	public String getNie() {
		return nie;
	}

	public void setNie(String nie) {
		this.nie = nie;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
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

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public boolean isFirst_access() {
		return first_access;
	}

	public void setFirst_access(boolean first_access) {
		this.first_access = first_access;
	}

	public List<PaymentMethod> getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(List<PaymentMethod> payment_method) {
		this.payment_method = payment_method;
	}

	
	
}
