
import arrowIcon from '../../assets/pagination-button.svg';
import './styles.css';

export default function Pagination() {

    return (

        <div className="dsmovie-pagination-container">
            <div className="dsmovie-pagination-box">
                <button
                    className="dsmovie-pagination-button"
                    disabled={true}
                    aria-label="Página anterior"
                >
                    <img src={arrowIcon} alt={"Anterior"} />
                </button>
                <p>{`${1} de ${3}`}</p>
                <button
                    className="dsmovie-pagination-button"
                    disabled={false}
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