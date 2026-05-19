package com.devsuperior.dsmovie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.repositories.MovieRepository;

@Service
public class MovieService {
	
	
	@Autowired
	private MovieRepository repository;
		
	
	/*Buscar lista de filmes no DB, convertendo de Movie para MovieDTO;
	  Para disponibilizar página de listagem de filmes para a camada de controladores*/
	@Transactional(readOnly = true)
	public Page<MovieDTO> findAll(Pageable pageable) {
		Page<Movie> moviesList = repository.findAll(pageable);
		Page<MovieDTO> MoviesListDTO = moviesList.map(x -> new MovieDTO(x));
		return MoviesListDTO;
	}
	
	/*Buscar um filme no DB, convertendo de Movie para MovieDTO
	 * Para disponibilizar filme para camada de controladores*/
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Movie movie = repository.findById(id).get();
		MovieDTO movieDto = new MovieDTO(movie);
		return movieDto;
	}
	
	
	
}
