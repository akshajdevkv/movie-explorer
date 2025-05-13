 
import { useState ,useEffect} from 'react';
import './App.css'
import Search from './components/Search';
import { Spinner } from './components/Spinner';
import MovieCard from './components/MovieCard';
 
const API_BASE_URL="https://api.themoviedb.org/3/";
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS={
    method:'GET',
    headers:{
      accept:'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2E1ZTkxZmY4ZGE5Mjk1NWU1ZTIwZWRjZTFjNWE3MiIsIm5iZiI6MS43NDY5NjkzNjIyODE5OTk4ZSs5LCJzdWIiOiI2ODIwYTMxMmIxZGNjMzNhZjY3MzhjYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s_vRua2p4qd4-YfB17EyNCmwts-NitferKDbVqt_b24'
  
    }
}
function App(){

  const [searchTerm,setSearchTerm] =useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [movieList,setMovieList] = useState([]);
  const [isLoading,setIsLoading]= useState();
  const fetchMovies=async()=>{
    setErrorMessage('');
    setIsLoading(true);
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response =await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new Error("failed to fetch new movies")
      }
      const data = await response.json();
      setMovieList(data.results|| []);
    }catch(error){
        console.error(`Error fetching movies ${error}`);
        setErrorMessage('Error fetching,please try again later')
    }finally{
      setIsLoading(false);
    }
  }
   
  useEffect(()=>{
    fetchMovies();

  },[]);
  return <main>
    <div className='pattern'/>
    <div className='wrapper'>
      <header>
        <img src="/hero.png" alt="Hero Banner" />
        <h1 >Find <span className='text-gradient'>Movies</span> that you'll enjoy without Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <section className='all-movies'>
        <h2 className='mt-[20px]'>All Movies</h2>
        {isLoading ? (
  <Spinner/>
) : errorMessage ? (
  <p className="text-white">{errorMessage}</p>
) : (
  <ul>
    {movieList.map((movie) => (
      <MovieCard key={movie.id} movie={movie}/>
    ))}
  </ul>
)}
      </section>
    </div>
  </main>
}

export default App;
