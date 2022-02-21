import { Grid } from '@mui/material';
import React from 'react';
import { img_300, unavailable } from '../../config/config';
import './CastProfile.scss';

const CastProfile = ({id, name, character, photo }) => {
    return (
        <Grid item className="profile__list">
            <div className="profile">
                <img className="profile__pic" src={photo?`${img_300}/${photo}` : unavailable } alt={name} />
                <p className="profile__name">{name}</p>
                <span>{character}</span>
            </div>
        </Grid>
    );
};

export default CastProfile;
