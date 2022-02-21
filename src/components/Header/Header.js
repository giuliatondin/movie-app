import { Container } from '@mui/material';

import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <Container>
                <a href="/" title="Home">
                    <h1>
                        <img className='header__logo' src="./logo.svg" alt="Logo Tmdb"/>
                    </h1>
                </a>
            </Container>
        </header>
    );
};

export default Header;