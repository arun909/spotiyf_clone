import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
    
    useEffect(() => {
        const getCurrentTrack = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                });
                if (response.data !== "") {
                    const { item } = response.data;
                    const currentlyPlaying = {
                        id: item.id,
                        name: item.name,
                        artists: item.artists.map((artist) => artist.name),
                        image: item.album.images[2].url,
                    };
                    dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
                } 
            } catch (error) {
                console.log("Error getting current track:", error);
            }
        };

        if (token) {
            getCurrentTrack();
        }
    }, [token, dispatch]);

    return (
        <Container>
            {currentlyPlaying && (
                <div className="track">
                    <div className="track__image">
                        <img src={currentlyPlaying.image} alt="Currently playing" />
                        <div className="vinyl-effect"></div>
                    </div>
                    <div className="track_info">
                        <h4 className="track-name">{currentlyPlaying.name}</h4>
                        <p className="track-artists">{currentlyPlaying.artists.join(", ")}</p>
                    </div>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  z-index: 1;

  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .track__image {
      position: relative;
      
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 8px;
        border: 2px solid #ff0080;
        box-shadow: 
          0 0 15px rgba(255, 0, 128, 0.4),
          inset 0 0 15px rgba(0, 255, 136, 0.1);
        animation: pulse 2s ease-in-out infinite;
      }
      
      .vinyl-effect {
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px solid #00ff88;
        border-radius: 8px;
        opacity: 0.6;
        animation: rotate 3s linear infinite;
      }
    }
    
    .track_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      
      .track-name {
        color: #00ff88;
        font-family: 'Orbitron', monospace;
        font-size: 1rem;
        font-weight: 700;
        margin: 0;
        text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      }
      
      .track-artists {
        color: rgba(255, 0, 128, 0.8);
        font-family: 'Courier Prime', monospace;
        font-size: 0.9rem;
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }

  @keyframes pulse {
    0%, 100% { 
      box-shadow: 
        0 0 15px rgba(255, 0, 128, 0.4),
        inset 0 0 15px rgba(0, 255, 136, 0.1);
    }
    50% { 
      box-shadow: 
        0 0 25px rgba(255, 0, 128, 0.6),
        inset 0 0 25px rgba(0, 255, 136, 0.2);
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;