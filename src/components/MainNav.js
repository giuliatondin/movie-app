import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (value === 0) navigate("/");
        else if(value === 1) navigate("/search");
    }, [value, navigate]);

    return (
        <Box sx={{ width: "100%", position: "fixed", bottom: 0, background: 'rgba(79, 81, 140, 1.0)', zIndex: 100 }}>
            <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue); }} sx={{ backgroundColor: 'transparent' }}>
                
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Trending"
                    icon={< WhatshotIcon />}/>

                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Search"
                    icon={< SearchIcon />}/>

            </BottomNavigation>
        </Box>
    );
}