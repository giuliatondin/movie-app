import React from 'react';
import Pagination from '@mui/material/Pagination';
import './CustomPagination.scss';

const CustomPagination = ({setPage, numOfPages}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };

    return (
        <div className='pagination'>
            <Pagination class="list" count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)} color="primary" hidePrevButton hideNextButton/>
        </div>
    );
};


export default CustomPagination;