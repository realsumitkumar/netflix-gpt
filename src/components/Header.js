import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleOnSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="flex absolute w-full h-20 bg-gradient-to-b from-red-900">
      <div>
        <img
          className="absolute z-10 h-24 w-40 mx-8 py-2 text-white"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="netflix-logo"
        ></img>
      </div>
      {user && (
        <div>
          <img
            className="absolute z-10 w-12 h-14 mx-28 my-3 py-2 text-white right-0 rounded-full cursor-pointer"
            src={user?.photoURL}
            alt="logout"
          ></img>
        </div>
      )}
      {user && (
        <div>
          <button
            onClick={handleOnSignOut}
            className="absolute z-10 w-16 h-10 mx-8 my-5 py-2 border border-red-700 font-bold rounded-xl right-0 text-white bg-red-700 "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
