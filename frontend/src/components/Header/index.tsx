import githubIcon from '../../assets/github.svg';
import './styles.css';

export default function Header() {

    return(
        <header>
            <nav className="container">
                <div className="dsmovie-nav-content">
                    <h1>DSMovie</h1>
                    <a href="https://github.com/devsuperior">
                        <div className="dsmovie-contact-container">
                            <img src={githubIcon} alt="Github" />
                            <p className="dsmovie-contact-link">
                                /devsuperior
                            </p>
                        </div>
                    </a>
                </div>
            </nav>
        </header>
    );

}