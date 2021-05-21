package com.e3a.controllers;

import com.e3a.models.entity.User;
import com.e3a.models.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

    @Autowired
    private IUserService userService;

    @GetMapping("/users")
    public List<User> index() {
        return userService.findAll();

    }

    @GetMapping("/users/{id}")
    public User show(@PathVariable Long id) {
        return userService.findById(id);
    }
    
}
