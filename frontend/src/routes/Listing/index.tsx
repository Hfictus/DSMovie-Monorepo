/*Os cards, MovieCard, são organizados na página com classes CSS com Bootstrap*/

import Pagination from '../../components/Pagination';
import MovieCard from '../../components/MovieCard';
import axios from 'axios';
import { BASE_URL } from '../../utils/requests';
import { useEffect, useState } from 'react';
import type { MoviePage } from '../../types/movie';

export default function Listing() {
    
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=0`)
        .then(response => {
            const data = response.data as MoviePage;
            console.log(response.data);
            setPageNumber(data.number);
            console.log("pageNumber: " + pageNumber);
        });
    
    },[]);

    
    
    return (
        <>
            <p>{pageNumber}</p>
            <Pagination />
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                        <MovieCard />
                    </div>
                </div>
            </div>
        </>
    )
}