import { useDispatch, useSelector } from "react-redux";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";
import { MovieAPIOptions } from "../utils/constants";

const useTopRated = () => {
  const dispatch = useDispatch();
  const topRated = useSelector((store) => store.movies.airingToday);

  const getTopRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      MovieAPIOptions
    );
    const json = await data.json();

    dispatch(addTopRated(json.results));
  };

  useEffect(() => {
    //memoization is done, to avoid unnecessary api calls
    !topRated && getTopRated();
  }, []);
};

export default useTopRated;
