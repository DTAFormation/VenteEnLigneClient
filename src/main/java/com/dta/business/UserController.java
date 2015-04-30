package com.dta.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.dta.dao.UserDao;
import com.dta.domain.User;

@Controller("userController")
public class UserController {

	@Autowired
	private UserDao userDao;

	public User create(User user) {
		return userDao.create(user);
	}

	public User find(int id) {
		return userDao.find(id);
	}

	public List<User> findAll() {
		return userDao.findAll();
	}

	public User update(User user) {
		return userDao.update(user);
	}

	public void delete(int id) {
		userDao.delete(id);
	}
}
