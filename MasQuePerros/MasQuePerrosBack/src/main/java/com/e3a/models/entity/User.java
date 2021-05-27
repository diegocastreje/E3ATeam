package com.e3a.models.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="users")
public class User implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long user_id;	
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
	//@NotEmpty(message = "This field can not be empty")
	@Column
	@DateTimeFormat(pattern = "yyyy-MM-dd" )
	private Date birth_date;
	@NotEmpty(message = "This field can not be empty")
	@Column(unique = true,length = 50)
	@Email
	private String email;
	@Column
	private boolean first_access; //true->first access / false->not first access
	
	@JsonIgnoreProperties({"role_id","hibernateLazyInitializer","handler"})
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="role_id", foreignKey = @ForeignKey(name="fk_role"))
	private Role role;
	@NotNull
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="payment_id", foreignKey = @ForeignKey(name="fk_paymentMethod"))
	private PaymentMethod payment_method;
	
	public User() {}

	
	
	
	public User(long user_id,
			@Size(min = 4, max = 20, message = "This field should have beetween 4 and 20 characters") String username,
			String password, String first_name, String middle_name, String last_name, Date birth_date, String email,
			boolean first_access) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.first_name = first_name;
		this.middle_name = middle_name;
		this.last_name = last_name;
		this.birth_date = birth_date;
		this.email = email;
		this.first_access = first_access;
	}




	public long getUser_id() {
		return user_id;
	}

	public void setUser_id(long user_id) {
		this.user_id = user_id;
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

	
	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", username=" + username + ", password=" + password + ", first_name="
				+ first_name + ", middle_name=" + middle_name + ", last_name=" + last_name + ", birth_date="
				+ birth_date + ", email=" + email + ", first_access=" + first_access + ", role=" + role
				+ ", payment_method=" + payment_method + "]";
	}


	private static final long serialVersionUID = 1L;
}
