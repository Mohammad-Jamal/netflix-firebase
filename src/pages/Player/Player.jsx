import React from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Player = () => {
  const { id } = useParams();
  const API = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmM2NGI1Y2MwNWQ0MzZjYWI0OGM0YTQwYzY2OTA0MSIsIm5iZiI6MTcyNjA2MjEyOC4xNjY2OTcsInN1YiI6IjY2ZTE0NDVhYTM2ZGFkNDcwYjU0ZTI1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oOxSDlfLjFzJ_K9E7DqRzJJdwLxeC59UaKoa8W6XwO0",
    },
  };

  const fetchMoviePlayer = async () => {
    const res = await fetch(API, options);
    const data = await res.json();
    return data.results[0];
  };

  const { data, isError, isLoading, isPending, error } = useQuery({
    queryKey: ["moviePlayers"],
    queryFn: fetchMoviePlayer,
  });

  return (
    <div className="player">
      <Link to="/">
        <img src={back_arrow_icon} alt="" />
      </Link>
      {isLoading && isPending && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {data && (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${data.key}`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>{data.published_at.slice(0, 10)}</p>
            <p>{data.name}</p>
            <p>{data.type}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
