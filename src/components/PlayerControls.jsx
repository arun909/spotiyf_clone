import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });
    } catch (error) {
      console.log("Error changing player state:", error);
    }
  };

  const changeTrack = async (type) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      const response1 = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response1.data !== "") {
        const currentPlaying = {
          id: response1.data.item.id,
          name: response1.data.item.name,
          artists: response1.data.item.artists.map((artist) => artist.name),
          image: response1.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    } catch (error) {
      console.log("Error changing track:", error);
    }
  };

  return (
    <Container>
      <div className="control-button shuffle">
        <BsShuffle />
        <div className="button-glow"></div>
      </div>
      <div className="control-button previous" onClick={() => changeTrack("previous")}>
        <CgPlayTrackPrev />
        <div className="button-glow"></div>
      </div>
      <div className="control-button state main-control" onClick={changeState}>
        {playerState ? (
          <BsFillPauseCircleFill />
        ) : (
          <BsFillPlayCircleFill />
        )}
        <div className="button-glow"></div>
      </div>
      <div className="control-button next" onClick={() => changeTrack("next")}>
        <CgPlayTrackNext />
        <div className="button-glow"></div>
      </div>
      <div className="control-button repeat">
        <FiRepeat />
        <div className="button-glow"></div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;
  z-index: 1;

  .control-button {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
    svg {
      color: #00ff88;
      transition: all 0.3s ease;
      filter: drop-shadow(0 0 5px currentColor);
      position: relative;
      z-index: 2;
    }
    
    .button-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(255, 0, 128, 0.3), transparent);
      border-radius: 50%;
      transition: all 0.3s ease;
      opacity: 0;
    }
    
    &:hover {
      transform: translateY(-3px);
      
      svg {
        color: #ff0080;
        filter: drop-shadow(0 0 15px currentColor);
      }
      
      .button-glow {
        width: 60px;
        height: 60px;
        opacity: 1;
      }
    }
    
    &:active {
      transform: translateY(-1px);
    }
    
    &.shuffle,
    &.repeat {
      svg {
        font-size: 1.5rem;
      }
    }
    
    &.previous,
    &.next {
      svg {
        font-size: 2rem;
      }
    }
    
    &.main-control {
      background: linear-gradient(145deg, #ff0080, #cc0066);
      border: 3px solid #00ff88;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      box-shadow: 
        0 0 20px rgba(255, 0, 128, 0.4),
        inset 0 0 20px rgba(0, 255, 136, 0.1);
      
      svg {
        color: white;
        font-size: 2.5rem;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
      }
      
      &:hover {
        box-shadow: 
          0 0 30px rgba(255, 0, 128, 0.6),
          inset 0 0 30px rgba(0, 255, 136, 0.2);
        border-color: #ff0080;
        
        svg {
          color: #00ff88;
        }
      }
    }
  }
`;