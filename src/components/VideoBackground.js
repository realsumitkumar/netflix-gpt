import React from "react";
import { useSelector } from "react-redux";
import useVideoTrailer from "../hooks/useVideoTrailer";

const VideoBackground = ({ movieId }) => {
  const movieTrailerSelector = useSelector(
    (store) => store.movies?.trailerVideo
  );

  useVideoTrailer(movieId);

  return (
    <div className="p-0 w-full h-full aspect-video overflow-hidden">
      <iframe
        className="w-full h-full aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          movieTrailerSelector?.key +
          "?autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
