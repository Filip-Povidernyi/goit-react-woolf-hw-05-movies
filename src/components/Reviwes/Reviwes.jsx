import { fetchReviews } from "components/API/api";
import { Loader } from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styleReviwes from './style.module.css'


const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await fetchReviews(movieId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {reviews.length !== 0 ? (
        <div>
          <h2 className="text-2xl pb-4 font-bold pt-4">Movie Reviews</h2>
          <ul className={styleReviwes.list}>
            {reviews.map(review => (
              <li key={review.id}>
                <h2>Author: {review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>We don't have any reviews for this movie</div>
      )}
    </>
  );
};

export default Reviews;