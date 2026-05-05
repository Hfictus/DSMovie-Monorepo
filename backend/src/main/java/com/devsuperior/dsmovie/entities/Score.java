package com.devsuperior.dsmovie.entities;

public class Score {

	//id (chave primária composta)
	private ScorePK id = new ScorePK();

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
	
	//Associar um usuário a um score
	public void setUser(User user) {
		id.setUser(user);
	}
	
}