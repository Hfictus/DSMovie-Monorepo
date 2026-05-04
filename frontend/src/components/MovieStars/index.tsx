/*Componente atômico*/

import starFull from '../../assets/star-full.svg';
import starHalf from '../../assets/star-half.svg';
import starEmpty from '../../assets/star-empty.svg';
import './styles.css';

export default function MovieStars() {

    return (
        <div className="dsmovie-stars-container">
            <img src={starFull} alt="Estrela amarela toda prenxida" />
            <img src={starFull} alt="Estrela amarela toda prenxida" />
            <img src={starFull} alt="Estrela amarela toda prenxida" />
            <img src={starHalf} alt="Estrela amarela preenxida pela metade" />
            <img src={starEmpty} alt="Estrela vazia" />
        </div>

    );
}