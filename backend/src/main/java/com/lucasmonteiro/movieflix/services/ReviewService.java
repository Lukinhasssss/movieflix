package com.lucasmonteiro.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucasmonteiro.movieflix.dto.ReviewDTO;
import com.lucasmonteiro.movieflix.entities.Movie;
import com.lucasmonteiro.movieflix.entities.Review;
import com.lucasmonteiro.movieflix.entities.User;
import com.lucasmonteiro.movieflix.repositories.MovieRepository;
import com.lucasmonteiro.movieflix.repositories.ReviewRepository;
import com.lucasmonteiro.movieflix.repositories.UserRepository;

@Service
public class ReviewService {
	
	@Autowired 
	private ReviewRepository repository;
	
	@Autowired 
	private MovieRepository movieRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
		Review review = new Review();
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User userAuthenticated = userRepository.findByEmail(authentication.getName());
		System.out.println(userAuthenticated);
		
		Movie movie = movieRepository.getOne(dto.getMovieId());
		
		review.setUser(userAuthenticated);
		review.setMovie(movie);
		review.setText(dto.getText());
		
		review = repository.save(review);
		
		return new ReviewDTO(review);
	}

}
