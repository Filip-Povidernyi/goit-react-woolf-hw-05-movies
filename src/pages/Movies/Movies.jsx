import { fetchSearchByKeyword } from "components/API/api";
import { Loader } from "components/Loader/Loader";
import SearchForm from "components/SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EditorMovieList from '../../components/MoviesList/MoviesList'



const Movies = () => {
  const [searchFilms, setSearchFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMoviesText, setNoMoviesText] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') || '';

  const updateQueryString = query => {
    const nextParams = query !== '' && { query };
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const movies = await fetchSearchByKeyword(movieName);
        setSearchFilms(movies);
        setNoMoviesText(movies.length === 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [movieName]);

  return (
    <main>
      <SearchForm searchMovies={updateQueryString} />
      {loading && <Loader />}
      {noMoviesText && (
        <p>There are no movies with this request. Please, try again...</p>
      )}
      {searchFilms.length > 0 && <EditorMovieList films={searchFilms} />}
    </main>
  );
};

export default Movies;