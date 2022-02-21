import { Chip } from '@material-ui/core';
import { Container } from '@mui/material';
import { Cancel } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect } from 'react';

import './Genres.scss';

const Genres = ({selectedGenres, setSelectedGenres, genres, setGenres, setPage}) => {
    
    const fetchGenres = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
        setGenres(data.genres);
    };

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }

    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({});
        }
        // eslint-disable-next-line
    }, []);

    const styles = {
        genreOpt: {
            borderRadius:`4px`, backgroundColor: `#fff`, fontWeight: 700, fontSize: `16px`, lineHeight: `24px`, padding: `8px 16px`, borderRadius: `4px`, marginBottom: `12px`, marginRight: `12px`
        },
        genreOptSelected: {
            color: `#fff`, borderRadius:`4px`, backgroundColor: `#D18000`, fontWeight: 700, fontSize: `16px`, lineHeight: `24px`, padding: `8px 16px`, borderRadius: `4px`, marginBottom: `12px`, marginRight: `12px`
        }
    }

    return (
        <div className='filter'>
            <Container>
                <h2 className='filter__title'> Milhões de filmes, séries e pessoas para descobrir. Explore já. </h2>  
                <span className='filter__span'>Filtre por:</span> 
                <div className="filter__list">
                    { selectedGenres && selectedGenres.map((genre) => (
                        <Chip key={genre.id} label={genre.name} clickable 
                            onDelete={() => handleRemove(genre)}
                            style={styles.genreOptSelected}
                            deleteIcon={<Cancel style={{color: `#fff`}} />} />
                    ))}
                    { genres && genres.map((genre) => (
                        <Chip key={genre.id} label={genre.name} clickable 
                            onClick={() => handleAdd(genre)}
                            style={styles.genreOpt} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Genres;