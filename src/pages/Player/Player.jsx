import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from "react-router-dom";
const Player = () => {
  const {id} = useParams();
  console.log(id);
  const [apiData,setApiData] = useState({
    name:'',
    key: '',
    type:'',
    published_at: ''
  })
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmM2NGI1Y2MwNWQ0MzZjYWI0OGM0YTQwYzY2OTA0MSIsIm5iZiI6MTcyNjA2MjEyOC4xNjY2OTcsInN1YiI6IjY2ZTE0NDVhYTM2ZGFkNDcwYjU0ZTI1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oOxSDlfLjFzJ_K9E7DqRzJJdwLxeC59UaKoa8W6XwO0",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="player">
      <Link to='/'>
      <img src={back_arrow_icon} alt="" />
      </Link>

      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
