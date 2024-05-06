import { fetchMovieDetails } from "components/API/api";
import { Loader } from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import noImage from '../../noImageFile/noImage.png'
import styleMovieCard  from './style.module.css'


const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetailsData = async () => {
      try {
        setLoading(true);
        const detailMovie = await fetchMovieDetails(movieId);
        setMovieInfo(detailMovie);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailsData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movieInfo) {
    return null;
  }

  const { title, release_date, overview, genres, poster_path, original_title } =
    movieInfo;

  const companiesList = movieInfo.production_companies?.map(
    ({ id, logo_path, name }) =>
      logo_path && (
        <li key={id}>
          {logo_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${logo_path}`}
              alt={name}
              style={{
                maxHeight: 50,
                maxWidth: 200,
                marginRight: 30,
                marginTop: 10,
              }}
            />
          )}
        </li>
      )
  );

  const roundedPopularity = Math.round(movieInfo.vote_average * 10);

  return (
    <>
      <Link to={location.state?.from ?? '/'}>
        <button
          className={styleMovieCard.button}
          type="button"
        >
          Go back
        </button>
      </Link>

      <div className={styleMovieCard.container}>
        <img
          width="300px"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `${noImage}`
          }
          alt={original_title}
        />
        <div>
          <h1 className="text-2xl pb-4 font-bold">
            {title} ({release_date.slice(0, 4)})
          </h1>
          <p className="pb-4">User score: {roundedPopularity}%</p>
          <h2 className="text-2xl pb-4 font-bold">Overview</h2>
          <p className="pb-4">{overview}</p>
          <h2 className="text-2xl pb-4 font-bold">Genres</h2>
          <ul className={styleMovieCard.list}>
            {genres.map(genre => (
              <li className="pb-4" key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>

          {companiesList[0] !== null && companiesList.length > 0 && (
            <>
              <h2 className="text-2xl pb-4 font-bold">Production companies</h2>
              <ul className={styleMovieCard.info}>{companiesList}</ul>
            </>
          )}
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-2xl pb-4 font-bold pt-4">Additional information</h3>
        <ul className={styleMovieCard.info}>
          <li className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <Link to="cast">Cast</Link>
          </li>
          <li className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;