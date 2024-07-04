import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMoviesName: null,
    gptSearchResults: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesSearchResults: (state, action) => {
      const { moviesList, searchResults } = action.payload;
      state.gptSearchResults = searchResults;
      state.gptMoviesName = moviesList;
    },
  },
});

export const { toggleGptSearchView, addGptMoviesSearchResults } =
  gptSlice.actions;
export default gptSlice.reducer;
