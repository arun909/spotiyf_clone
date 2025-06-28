import React from "react";
import styled from "styled-components";
export default function login() {
    const handleClick = () => {
      const client_id = "00a864d07fc944318a4c55cf975caea3";
      const redirecturl = "http://localhost:3000/";
      const apiurl ="https://accounts.spotify.com/authorize";
      const scope = [
        "user-read-email",
        "user-read-private",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-top-read",

      ];
      window.location.href = `${apiurl}?client_id=${client_id}&redirect_uri=${redirecturl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    }

    return (
    <Container>
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png" 
    alt="spotify" 
    />

    <button onClick={handleClick}>CONNECT SPOTIFY</button>

    </Container>
    );

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954; 
  gap: 5rem;

  img {
    height: 20vh;
  }
    
    button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;

  }

`;