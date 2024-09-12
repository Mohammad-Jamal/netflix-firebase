import React, { memo, useEffect, useRef } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const API = `https://api.themoviedb.org/3/movie/${
    category === undefined ? "now_playing" : category
  }?language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmM2NGI1Y2MwNWQ0MzZjYWI0OGM0YTQwYzY2OTA0MSIsIm5iZiI6MTcyNjAzOTQ1My40OTM0NjMsInN1YiI6IjY2ZTE0NDVhYTM2ZGFkNDcwYjU0ZTI1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6xihuExdG1Ir7ByVpFN4b9se_lowuc09-9Q1MtplpDU",
    },
  };
  const fetchMovies = async () => {
    const res = await fetch(API, options);
    const data = await res.json();
    return data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies(category),
  });

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error?.message}</p>}
        {data?.results?.map(({ backdrop_path, id, original_title }, index) => (
          <Link to={`/player/${id}`} key={index} className="card">
            <img
              src={`https://image.tmdb.org/t/p/w500/` + backdrop_path}
              alt={original_title}
            />
            <p>{original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(TitleCards);
