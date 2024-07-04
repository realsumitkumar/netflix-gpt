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
    <div className="absolute w-full h-20 flex flex-col justify-items-center">
      <div className="">
        <img
          className="absolute md:h-24 h-16 my-3 md:my-0 md:w-40 mx-auto p-2  text-white left-0 "
          src={NETFLIX_LOGO}
          alt="netflix-logo"
        ></img>
      </div>
      {user && (
        <div>
          {languageSelector && (
            <select
              className="absolute z-20 right-52 md:right-72 my-20 md:my-6  md:p-2 md:my-8 text-center rounded-lg opacity-60 w-auto"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <div className="absolute right-44 md:right-40 font-bold w-24 h-16 my-6 py-1 text-center">
            <button
              onClick={handleGptSearchClick}
              className="absolute text-center flex z-10 h-auto p-2 border border-red-600 font-lg rounded-lg right-0 text-white bg-red-900"
            >
              {languageSelector ? "Homepage" : "AI Search"}
            </button>
          </div>
          <div>
            <img
              className="absolute z-10 w-10 h-12 mx-20 my-6 py-1  text-white right-0 rounded-full cursor-pointer"
              src={user?.photoURL}
              alt="logout"
            ></img>
          </div>
          <div>
            <button
              onClick={handleOnSignOut}
              className="absolute z-10 w-14 h-10 mx-4 my-7 py-1 border border-red-700 font-semibold rounded-lg right-0 text-white bg-red-700 "
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
