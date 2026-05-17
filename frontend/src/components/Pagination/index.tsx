
import arrowIcon from '../../assets/pagination-button.svg';
import type { MoviePage } from '../../types/movie';
import './styles.css';

type Props = {
    page: MoviePage;
    onChange: (newPageNumber: number) => void;
}


export default function Pagination({ page, onChange }: Props) {

    return (

        <div className="dsmovie-pagination-container">
            <div className="dsmovie-pagination-box">
                <button
                    className="dsmovie-pagination-button"
                    disabled={page.first}
                    onClick={() => onChange(page.number - 1)}
                    aria-label="Página anterior"
                >
                    <img src={arrowIcon} alt={"Anterior"} />
                </button>
                <p>{`${page.number + 1} de ${page.totalPages}`}</p>
                <button
                    className="dsmovie-pagination-button"
                    disabled={page.last}
                    onClick={() => onChange(page.number + 1)}
                    aria-label="Próxima página"
                >
                    <img className="dsmovie-flip-horizontal" src={arrowIcon} alt={"página seguinte"} />
                </button>
            </div>
        </div>

    );
}
/*aria-label
    O Texto contido em aria-label é lido por leitores de tela, ao invés do texto contido em alt (img).
    Faz o leitor de tela dizer se o botão está ou não disponível, devido ao uso de disabled.
*/