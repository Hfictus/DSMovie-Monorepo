/*Componente atômico*/

import starFull from '../../assets/star-full.svg';
import starHalf from '../../assets/star-half.svg';
import starEmpty from '../../assets/star-empty.svg';
import './styles.css';

type Props = {
    score: number;
}

type StarProps = {
    fill: number;
}

//função auxiliar para construir vetor de números:
function getFills(score: number) {
    const fills = [0, 0, 0, 0, 0];
    const integerPart = Math.floor(score);
    for(let i = 0; i < integerPart; i++) {
        fills[i] = 1;
    }
    const diff = score - integerPart;
    if(diff > 0) {
        fills[integerPart] = 0.5;
    }
    return fills;
}

//Componente não exportado para definir qual estrela será renderizada em cada posição do vetor de getFills:
function Star({ fill }: StarProps) {
    if(fill === 0) {
        return     <img src={starEmpty} alt="Estrela vazia" />
    }
    else if(fill === 1) {
        return <img src={starFull} alt="Estrela amarela toda prenxida" />
    }
    else {
        return <img src={starHalf} alt="Estrela amarela preenchida pela metade" />
    }
}


export default function MovieStars({ score }: Props) {

    const fills = getFills(score); //Montar vetor de números

    return (
        //Renderizar cada estrela em sua posição de acordo com o if em Star
        <div className="dsmovie-stars-container">
            <Star fill={fills[0]} />        
            <Star fill={fills[1]} />
            <Star fill={fills[2]} />
            <Star fill={fills[3]} />
            <Star fill={fills[4]} />
        </div>

    );
}