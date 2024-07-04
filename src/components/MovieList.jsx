import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetailsModal from "./MovieDetailsModal";

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieCardClick = (movie) => {
    const youtubeVideoId = movie.id;
    setSelectedMovie({ ...movie, youtubeVideoId });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="md:my-0 mx-2 p-1 bg-black">
      <h1 className="md:text-2xl mt-2 mx-1 text-white">{title}</h1>
      <div className="flex overflow-x-auto scroll-smooth no-scrollbar">
        <div className="flex">
          {movies &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                poster_path={movie?.poster_path}
                onClick={() => handleMovieCardClick(movie)}
              />
            ))}
        </div>
      </div>
      <MovieDetailsModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default MovieList;
