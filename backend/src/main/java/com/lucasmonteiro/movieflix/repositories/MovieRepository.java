package com.lucasmonteiro.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasmonteiro.movieflix.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
