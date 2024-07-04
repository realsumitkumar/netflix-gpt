import { useDispatch, useSelector } from "react-redux";
import { addTrending } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrending = () => {
  const dispatch = useDispatch();
  const trending = useSelector((store) => store.movies.trending);

  const getTrending = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDU4MTNjZGIxZTVjYWQ1ZGIwMDM0NDdmOWYyODQ3NyIsIm5iZiI6MTcxOTM5NDA1NS4yOTk3MzMsInN1YiI6IjY2N2IwNGI4NTc1YzZlNGFmZmQ5ZWQyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HdkuwLd7VI6uqCw1P3beflbdwIxFkc2XdoiRc5DcMPI",
      },
    };
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    );
    const json = await data.json();

    dispatch(addTrending(json.results));
  };

  useEffect(() => {
    //memoization is done, to avoid unnecessary api calls
    !trending && getTrending();
  }, []);
};

export default useTrending;
