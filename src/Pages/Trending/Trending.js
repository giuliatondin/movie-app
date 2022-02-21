import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './Trending.scss';

import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenres';
import { Container } from '@mui/material';

const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreList = useGenres(selectedGenres);

    const fetchTrending = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}&with_genres=${genreList}`);
        console.log(data.results);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page, genreList]);

    return (
        <div>
            <Genres selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage}/>

            <Container>
                <div className='trending'>
                    {// if content is not empty
                    content && content.map((c) => (<SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title}
                        date={c.release_date}
                        vote_average={c.vote_average}/>))
                    }
                </div>

                {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages}/>)}
            </Container>
        </div>
    );
};

export default Trending;