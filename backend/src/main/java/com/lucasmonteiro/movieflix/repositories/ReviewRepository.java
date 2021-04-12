package com.lucasmonteiro.movieflix.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasmonteiro.movieflix.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
