package com.lucasmonteiro.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasmonteiro.movieflix.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);

}
