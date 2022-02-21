import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {

    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();

    const fetchSearch = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&query=${searchText}&page=${page}`);

        setContent(data.results);
        setNumOfPages(data.total_pages);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [page]);

    return (
        <div>
            <span className='page__title'>Search</span>
            <div style={{display: "flex", margin: "15px 0"}}>
                <TextField style={{ flex: 1 }} className="searchBox" label="Search" variant="filled"
                    onChange={(e) => setSearchText(e.target.value)} />
                <Button variant='contained' style={{marginLeft: 10}} onClick={fetchSearch} > 
                    <SearchIcon /> 
                </Button>
            </div>
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
        </div>
    );
};

export default Search;