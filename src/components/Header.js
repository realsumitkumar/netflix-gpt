import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const languageSelector = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribing the onAuthStateChanged(given by firebase)
    return () => {
      unsubscribe();
    };
  }, []);

  const handleOnSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    //logic of handling gpt search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    user && (
      <div className="absolute flex w-full h-20  ">
        <div>
          <img
            className="absolute z-10 h-24 w-40 mx-8 py-2 text-white"
            src={NETFLIX_LOGO}
            alt="netflix-logo"
          ></img>
        </div>
        {languageSelector && (
          <select
            className="absolute z-20 right-96 my-6 p-2 text-center rounded-lg opacity-60 w-22"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
        <div className="absolute right-52">
          <button
            onClick={handleGptSearchClick}
            className="absolute flex z-10 w-24 px-1 h-10 mx-6 my-6 py-2 border border-purple-600 font-lg rounded-lg right-0 text-white bg-purple-900"
          >
            {languageSelector ? "Home page" : "GPT Search"}
          </button>
        </div>
        <div>
          <img
            className="absolute z-10 w-10 h-12 mx-28 my-5 py-1  text-white right-0 rounded-full cursor-pointer"
            src={user?.photoURL}
            alt="logout"
          ></img>
        </div>
        <div>
          <button
            onClick={handleOnSignOut}
            className="absolute z-10 w-16 h-10 mx-8 my-6 py-2 border border-red-700 font-semibold rounded-lg right-0 text-white bg-red-700 "
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default Header;
