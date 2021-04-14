package com.lucasmonteiro.movieflix.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucasmonteiro.movieflix.dto.MovieDTO;
import com.lucasmonteiro.movieflix.entities.Genre;
import com.lucasmonteiro.movieflix.entities.Movie;
import com.lucasmonteiro.movieflix.repositories.GenreRepository;
import com.lucasmonteiro.movieflix.repositories.MovieRepository;
import com.lucasmonteiro.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Transactional(readOnly = true)
	public Page<MovieDTO> findAllPaged(Long genreId, PageRequest pageRequest) {
		Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);
		Page<Movie> page = repository.find(genre, pageRequest);
		return page.map(movie -> new MovieDTO(movie));
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie movie = obj.orElseThrow(() -> new ResourceNotFoundException("Filme não encontrado"));
		return new MovieDTO(movie);
	}

}
