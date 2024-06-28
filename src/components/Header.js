import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleOnSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
      });
  };

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

  return (
    <div className="absolute flex w-full h-20  ">
      <div>
        <img
          className="z-10 h-24 w-40 mx-8 py-2 text-white"
          src={NETFLIX_LOGO}
          alt="netflix-logo"
        ></img>
      </div>
      {user && (
        <div>
          <img
            className="absolute z-10 w-10 h-14 mx-28 my-3 py-2 text-white right-0 rounded-full cursor-pointer"
            src={user?.photoURL}
            alt="logout"
          ></img>
        </div>
      )}
      {user && (
        <div>
          <button
            onClick={handleOnSignOut}
            className="absolute z-10 w-16 h-10 mx-8 my-5 py-2 border border-red-700 font-bold rounded-lg right-0 text-white bg-red-700 "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
