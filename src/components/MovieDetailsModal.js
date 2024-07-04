import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { MovieAPIOptions } from "../utils/constants";

const MovieDetailsModal = ({ isOpen, onRequestClose, movie }) => {
  const [youtubeId, setYoutubeId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movie && isOpen) {
      const getVideoId = async (movieId) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            MovieAPIOptions
          );
          const json = await response.json();

          if (!json.results || json.results.length === 0) {
            setError("No trailer available");
            setYoutubeId(null);
            return;
          }

          const movieVideos = json.results;
          const trailers = movieVideos.filter(
            (video) => video.type === "Trailer"
          );
          const mainTrailer = trailers.length ? trailers[0] : movieVideos[0];

          const youtubeId = mainTrailer ? mainTrailer.key : null;
          setYoutubeId(youtubeId);
          setError(null);
        } catch (e) {
          setError("Failed to load trailer");
          setYoutubeId(null);
        }
      };

      getVideoId(movie.id);
    }
  }, [movie, isOpen]);

  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Movie Details"
      className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto my-6">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {movie.title}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-xl md:text-2xl lg:text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onRequestClose}
            >
              <span className="bg-transparent text-black h-6 w-6 text-xl md:text-2xl lg:text-3xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-4 flex-auto">
            <p className="my-2 text-gray-600 text-base leading-relaxed">
              {movie.overview}
            </p>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : youtubeId ? (
              <div className="w-full flex items-center ">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="aspect-w-16 aspect-h-9">
                    <YouTube videoId={youtubeId} className="w-full h-full" />
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading trailer...</p>
            )}
          </div>
          <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onRequestClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
