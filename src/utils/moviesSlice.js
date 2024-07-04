import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    trending: null,
    airingToday: null,
    topRated: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTrending: (state, action) => {
      state.trending = action.payload;
    },
    addAiringToday: (state, action) => {
      state.airingToday = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTrending,
  addAiringToday,
  addTopRated,
} = moviesSlice.actions;

export default moviesSlice.reducer;
