import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Componentss
import Header from './components/Header/Header';
import Trending from './Pages/Trending/Trending';
import MovieDetails from './Pages/MovieDetails/MovieDetails';

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header/>
            <div className="app">
                <Routes>
                    <Route path="/" exact element={<Trending />} />
                    <Route path="/details/:movie_id" exact element={<MovieDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
