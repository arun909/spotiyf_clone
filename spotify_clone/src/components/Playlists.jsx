import { styled } from 'styled-components';
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const { items } = response.data;
        const playlists = items.map(({ name, id }) => {
          return {
            name,
            id
          };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    };

    if (token) {
      getPlaylistData();
    }
  }, [token, dispatch]);

  return (
    <Container>
      <ul>
        {playlists && playlists.length > 0 ? (
          playlists.map(({ name, id }) => (
            <li key={id}>{name}</li>
          ))
        ) : (
          <li>No playlists available</li>
        )}
      </ul>     
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;  /* Keeps the container height fixed */
    max-height: 100%;
    overflow-y: auto;  /* Enables vertical scrollbar */

    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: white;
      }
    }

    /* Custom scrollbar styles */
    &::-webkit-scrollbar {
      width: 8px; /* Width of the scrollbar */
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3); /* Color of the scrollbar thumb */
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1); /* Color of the scrollbar track */
    }
  }
`;
