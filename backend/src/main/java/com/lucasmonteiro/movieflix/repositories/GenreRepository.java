package com.lucasmonteiro.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasmonteiro.movieflix.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
