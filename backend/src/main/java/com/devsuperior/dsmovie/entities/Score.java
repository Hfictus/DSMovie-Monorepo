package com.devsuperior.dsmovie.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_score")
public class Score {

	//id (chave primária composta)
	@EmbeddedId
	private ScorePK id = new ScorePK();

	//Evita conflito de value com termo reservado do H2
	@Column(name = "score_value")
	private Double value;
	
	
	public Score() {
	}

	public ScorePK getId() {
		return id;
	}

	public void setId(ScorePK id) {
		this.id = id;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	//Associar um score a um filme
	public void setMovie(Movie movie) {
		id.setMovie(movie);
	}
	
	//Associar um usuário a um score de um filme
	public void setUser(User user) {
		id.setUser(user);
	}
	
}