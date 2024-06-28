import React from "react";

export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video bg-gradient-to-r to-black">
      <div className="mt-48 mx-24">
        <h1 className="font-bold text-white text-3xl my-2">{title}</h1>
        <p className="w-1/3 text-md  text-white ">{overview}</p>
      </div>
      <div>
        <button className="border bg-white font-bold text-xl rounded-lg w-28 p-1 ml-24 mr-8 hover:bg-opacity-50">
          ▶️Play
        </button>
        <button className="border bg-gray-200 bg-opacity-20 font-bold text-xl rounded-lg p-1 w-28 hover:bg-opacity-50">
          Infoℹ️
        </button>
      </div>
    </div>
  );
};
