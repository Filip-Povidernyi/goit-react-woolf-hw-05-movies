import { fetchActors } from "components/API/api";
import { Loader } from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from '../../noImageFile/noImage.png'
import styleCast from './style.module.css'


const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorsOfMovie = async () => {
      try {
        setLoading(true);
        const actorsData = await fetchActors(movieId);
        setActors(actorsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorsOfMovie();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      <h2 className="text-2xl pb-4 font-bold pt-4">Movie Cast</h2>
          <ul className={styleCast.list}>
        {actors.map(({ id, profile_path, original_name, name, character }) => (
          <li key={id}>
            <img
              width="200px"
              height="300px"
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : `${noImage}`
              }
              alt={original_name}
            />
            <p className={styleCast.text}>{name}</p>
            <p className={styleCast.text}>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;