//import { Link } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { img_300, unavailable } from '../../config/config';
import './SingleContent.scss';

const SingleContent = ({id, poster, title, vote_average}) => {
    
    return (
        <Link to={`/details/${id}`} style={{ textDecoration: 'none' }}>
            <div className='movie'>
                <div className='movie__link'>
                    <img className='movie__poster' src={poster?`${img_300}/${poster}` : unavailable } alt={title} />
                    <div className='movie__vote'> {vote_average} </div>
                    <p className='movie__title'> {title}</p>
                </div>
            </div>
        </Link>
    );
};


export default SingleContent;