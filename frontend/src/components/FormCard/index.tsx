import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import axios, { type AxiosRequestConfig } from "axios";
import { BASE_URL } from "../../utils/requests";
import "./styles.css";
import { validateEmail } from '../../utils/validate';

type Props = {
    movieId: string;
}

export default function FormCard({ movieId }: Props) {

    const navigate = useNavigate();

    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${movieId}`)
            .then(response => {
                setMovie(response.data);
            });
    }, [movieId]);

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Captura direta usando a API nativa de elementos do formulário
        const form = event.currentTarget;
        const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;
        const scoreSelect = form.elements.namedItem('score') as HTMLSelectElement | null;

        // Validação defensiva rápida para garantir que os elementos existem
        if (!emailInput || !scoreSelect) return;

        const email = emailInput.value;
        const score = scoreSelect.value;

        if(!validateEmail(email)) {
            alert("Email inválido.");
            return;
        }

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: 'PUT',
            url: '/scores',
            data: {
                email: email,
                movieId: movieId,
                score: Number(score)
            }
        }
        
        axios(config).then(response => {
            console.log(response.data);
            navigate("/");
        });
    };

    return (
        <div className="dsmovie-form-container">
            <img className="dsmovie-movie-card-image" src={movie?.image} alt={movie?.title} />
            <div className="dsmovie-card-bottom-container">
                <h3>{movie?.title}</h3>
                {/* O onSubmit aceitará perfeitamente o React.SubmitEvent sem sublinhar vermelho */}
                <form className="dsmovie-form" onSubmit={handleSubmit}>
                    <div className="mb-3 dsmovie-form-group">
                        <label htmlFor="email">Informe seu email</label>
                        {/* Mantido o name="email" para o namedItem localizá-lo */}
                        <input type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-3 dsmovie-form-group">
                        <label htmlFor="score">Informe sua avaliação</label>
                        {/* Mantido o name="score" para o namedItem localizá-lo */}
                        <select className="form-control" id="score" name="score">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="dsmovie-form-btn-container">
                        <button type="submit" className="btn btn-primary dsmovie-btn">Salvar</button>
                    </div>
                </form >

                <Link to="/" className="btn btn-primary dsmovie-btn mt-3">
                    Cancelar
                </Link>

            </div >
        </div >
    );
}