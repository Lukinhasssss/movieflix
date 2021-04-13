package com.lucasmonteiro.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasmonteiro.movieflix.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
