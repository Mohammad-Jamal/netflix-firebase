import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link} from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmM2NGI1Y2MwNWQ0MzZjYWI0OGM0YTQwYzY2OTA0MSIsIm5iZiI6MTcyNjAzOTQ1My40OTM0NjMsInN1YiI6IjY2ZTE0NDVhYTM2ZGFkNDcwYjU0ZTI1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6xihuExdG1Ir7ByVpFN4b9se_lowuc09-9Q1MtplpDU",
    },
  };

  const fetchMovieData = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setApiData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieData();

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData?.map(({ backdrop_path, id, original_title }, index) => {
          return (
            <Link to={`/player/${id}`} key={index} className="card" >
              <img
                src={`https://image.tmdb.org/t/p/w500/` + backdrop_path}
                alt={original_title}
              />
              <p>{original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
