import { useDispatch, useSelector } from "react-redux";
import { addAiringToday } from "../utils/moviesSlice";
import { useEffect } from "react";
import { MovieAPIOptions } from "../utils/constants";

const useAiringToday = () => {
  const dispatch = useDispatch();
  const airingToday = useSelector((store) => store.movies.airingToday);

  const getAiringToday = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
      MovieAPIOptions
    );
    const json = await data.json();

    dispatch(addAiringToday(json.results));
  };

  useEffect(() => {
    //memoization is done, to avoid unnecessary api calls
    !airingToday && getAiringToday();
  }, []);
};

export default useAiringToday;
