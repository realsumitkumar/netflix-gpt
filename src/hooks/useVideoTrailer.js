import { useDispatch, useSelector } from "react-redux";
import { MovieAPIOptions } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useVideoTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      MovieAPIOptions
    );

    const json = await data.json();

    const movieVideos = json.results;
    const trailers = movieVideos.filter((movie) => movie.type === "Trailer");
    const mainTrailer = trailers.length ? trailers[0] : movieVideos[0];

    dispatch(addTrailerVideo(mainTrailer));
  };

  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useVideoTrailer;
