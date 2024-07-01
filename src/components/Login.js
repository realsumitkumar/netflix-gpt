import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase"; //authentication should be done at the top before the components

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_PAGE_BACKGROUND, USER_PHOTO_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch((store) => store.user);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    //validate the email and password
    const message = validateData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //signup api from firebase
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //signin firebase api
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={LOGIN_PAGE_BACKGROUND} alt="bg-netflix" />
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-4/12 border p-12 bg-black bg-opacity-70 my-36 mx-auto left-0 right-0 rounded-2xl text-white"
        >
          <p className="text-red-500 font-bold mx-2 p-1 text-center">
            {errorMessage}
          </p>
          <h1 className="text-white font-bold text-3xl mb-2 px-3">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              className="border rounded-lg p-3 m-2 my-4 w-full bg-gray-700"
              placeholder="Full Name"
            ></input>
          )}
          <input
            ref={email}
            type="text"
            className="border rounded-lg p-3 m-2 my-4 w-full bg-gray-700"
            placeholder="Email address"
          ></input>
          <input
            ref={password}
            type="password"
            className="border rounded-lg p-3 m-2 w-full  bg-gray-700"
            placeholder="Password"
          ></input>
          <button
            onClick={() => handleButtonClick()}
            className="bg-red-600 rounded-lg text-white border p-3 m-2 my-6 w-full font-bold text-xl"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="p-2 mx-2 cursor-pointer"
            onClick={() => setIsSignInForm(!isSignInForm)}
          >
            {isSignInForm
              ? "New to Netflix, Sign Up here !"
              : "Already a member, Login here "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
