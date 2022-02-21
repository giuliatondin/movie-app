import { Container, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CastProfile from '../../components/CastProfile/CastProfile';
import SingleContent from '../../components/SingleContent/SingleContent';
import { img_500, unavailable } from '../../config/config';
import StarIcon from '@mui/icons-material/Star';

import './MovieDetails.scss';

const MovieDetails = () => {
    
    const { movie_id } = useParams();
    const [content, setContent] = useState([]);
    const [creditsCast, setCreditsCast] = useState([]);
    const [creditsCrew, setCreditsCrew] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState();

    const fetchDetails = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&append_to_response=videos`);
        let date = data.release_date.split("-");
        date = `${date[2]}/${date[1]}/${date[0]}`;
        data.release_date = date;
        setTrailerKey(data.videos.results[0].key);
        setContent(data);
    };

    const fetchCredits = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
        setCreditsCast(data.cast);
        setCreditsCrew(data.crew);
    }

    const fetchRecommendations = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/movie/${movie_id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`);
        const list = data.results.slice(0, 6); // get first 6 recommendations
        setRecommendations(list);
    }

    useEffect(() => {
        window.scroll(0,0);
        fetchDetails();
        fetchCredits();
        fetchRecommendations();
        // eslint-disable-next-line
    }, [movie_id]);

    return (
        <div>
            <div className='overview'>
                <Container>
                    <Grid container columnSpacing={{sm: 2, lg: 4}}>
                        <Grid item xs={12} md={5} lg={3}>
                            <img className='poster' src={content.poster_path?`${img_500}/${content.poster_path}` : unavailable } alt={content.title} />
                        </Grid>
                        <Grid item xs={12} md={7} lg={9} className="description">
                            <h2 className="title"> {content.title} </h2>
                            <div style={{marginTop: '10px'}}> 
                                {content.release_date} • 
                                {content.genres && content.genres.map((c) => ( <span className='genres' key={c.id}> {c.name} </span>))} • {content.runtime} min
                            </div>

                            <div className="vote"> <StarIcon /> <span>{content.vote_average}/10 </span></div>

                            <p class="smallOverview">Sinopse</p>
                            <p> {content.overview} </p>
                            <div className="crew__description">
                                <div className="crew__position">Direção</div>
                                { creditsCrew && creditsCrew.map((crew) => ( 
                                    crew.job === 'Director'? 
                                        <div className="crew__name" key={crew.id}> {crew.name} </div> : null
                                ))}
                            </div>
                            <div className="crew__description">
                                <div className="crew__position">Roteiristas</div>
                                { creditsCrew && creditsCrew.map((crew) => ( 
                                    crew.job === 'Screenplay'? <div className="crew__name" key={crew.id}> {crew.name} </div> : null
                                ))}
                            </div>                       
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className='details'>
                <Container>
                    <h3 className="subtitle">Elenco original</h3>
                    <Grid container className="cast">
                        { creditsCast && creditsCast.map((cast) => ( <CastProfile 
                            key={cast.cast_id}
                            id={cast.cast_id}
                            name={cast.name}
                            character={cast.character}
                            photo={cast.profile_path} /> )) }
                    </Grid>

                    <div className='trailer'>
                        <h3 className="subtitle">Trailer</h3>
                        <iframe className='trailer__video' src={`https://www.youtube.com/embed/${trailerKey}`} title="Trailer" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    
                    <h3 className="subtitle">Recomendações</h3>
                    <div className='recommendations'>
                        { recommendations && recommendations.map((rec) => (<SingleContent 
                            key={rec.id}
                            id={rec.id}
                            poster={rec.poster_path}
                            title={rec.title}
                            vote_average={rec.vote_average}
                        />)) }
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default MovieDetails;