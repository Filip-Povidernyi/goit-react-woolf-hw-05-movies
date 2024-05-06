import { Link, useLocation } from 'react-router-dom';
import styleList from './style.module.css'


const MovieList = ({ films }) => {
  const location = useLocation();

  return (
    <ul className={styleList.list}>
      {films.map(film => (
        <li className={styleList.item} key={film.id}>
          <Link
            to={`/movies/${film.id}`}
            state={{ from: location }}
            cover={film.poster_path}
          >
            {film.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;