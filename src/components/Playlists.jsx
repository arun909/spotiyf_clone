import { styled } from 'styled-components';
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

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
          return { name, id };
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
      <div className="playlist-header">
        <h3>YOUR MIXTAPES</h3>
      </div>
      <ul>
        {playlists && playlists.length > 0 ? (
          playlists.map(({ name, id }) => (
            <li key={id} onClick={() => changeCurrentPlaylist(id)} className="playlist-item">
              <div className="cassette-icon">📼</div>
              <span className="playlist-name">{name}</span>
              <div className="item-glow"></div>
            </li>
          ))
        ) : (
          <li className="no-playlists">No mixtapes available</li>
        )}
      </ul>     
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: visible;
  position: relative;
  z-index: 1;

  .playlist-header {
    padding: 1rem;
    border-bottom: 2px solid #ff0080;
    margin-bottom: 1rem;
    
    h3 {
      font-family: 'Orbitron', monospace;
      font-size: 1rem;
      font-weight: 700;
      color: #00ff88;
      text-align: center;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1rem 1rem;
    height: 50vh;
    max-height: 100%;
    overflow-y: auto;

    .playlist-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0.8rem;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 0, 128, 0.2);
      background: linear-gradient(145deg, rgba(26, 0, 51, 0.8), rgba(42, 0, 64, 0.6));
      font-family: 'Courier Prime', monospace;

      &:hover {
        color: #ff0080;
        background: linear-gradient(145deg, rgba(255, 0, 128, 0.15), rgba(0, 255, 136, 0.1));
        border-color: #ff0080;
        transform: translateX(5px);
        box-shadow: 
          0 5px 15px rgba(255, 0, 128, 0.3),
          inset 0 0 20px rgba(0, 255, 136, 0.1);

        .cassette-icon {
          animation: wiggle 0.5s ease-in-out;
        }

        .item-glow {
          opacity: 1;
        }
      }

      .cassette-icon {
        font-size: 1.2rem;
        filter: drop-shadow(0 0 5px #ff0080);
      }

      .playlist-name {
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 0, 128, 0.2), transparent);
        transition: all 0.5s ease;
        opacity: 0;
      }
    }

    .no-playlists {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 2rem;
      font-family: 'Courier Prime', monospace;
    }

    /* Custom retro scrollbar */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #ff0080, #00ff88);
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
    }

    &::-webkit-scrollbar-track {
      background: rgba(26, 0, 51, 0.5);
      border-radius: 10px;
      border: 1px solid rgba(255, 0, 128, 0.2);
    }
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
  }
`;