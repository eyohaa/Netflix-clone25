
import React, { useEffect, useState, useRef } from "react";
import axios from "../../Utils/axios";
// import React, { useRef } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  console.log(title);
  console.log(fetchUrl);
  const [movies, setMovies] = useState([]);
  const [trailerurl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    (async () => {
      try {
        console.log(fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [fetchUrl]);
  const handleClick = (movie) => {
    if (trailerurl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          console.log(url);
          const urlparams = new URLSearchParams(new URL(url).search);
          console.log(urlparams);
          console.log(urlparams.get("v"));
          setTrailerUrl(urlparams.get("v"));
        }
      );
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie, index) => {
          return (
            <>
              <img
                onClick={() => handleClick(movie)}
                key={index}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              />
            </>
          );
        })}
      </div>
      <div className="trailer-container">
        {trailerurl && (
          <>
            <YouTube videoId={trailerurl} opts={opts} />
          </>
        )}
      </div>
    </div>
  );
};

export default Row