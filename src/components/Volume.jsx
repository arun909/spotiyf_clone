import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";

export default function Volume() {
  const [{ token }] = useStateProvider();
  
  const setVolume = async (e) => {
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
          params: {
            volume_percent: parseInt(e.target.value),
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log("Error setting volume:", error);
    }
  };

  return (
    <Container>
      <div className="volume-control">
        <span className="volume-label">VOL</span>
        <input 
          type="range" 
          onMouseUp={(e) => setVolume(e)} 
          min={0} 
          max={100} 
          className="volume-slider"
        />
        <div className="volume-glow"></div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  z-index: 1;

  .volume-control {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(145deg, rgba(26, 0, 51, 0.8), rgba(42, 0, 64, 0.6));
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    border: 2px solid #ff0080;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 
        0 0 20px rgba(255, 0, 128, 0.4),
        inset 0 0 20px rgba(0, 255, 136, 0.1);
      border-color: #00ff88;

      .volume-glow {
        opacity: 1;
      }
    }

    .volume-label {
      font-family: 'Orbitron', monospace;
      color: #00ff88;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }

    .volume-slider {
      width: 120px;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(90deg, #1a0033, #2a0040);
      outline: none;
      border: 1px solid #ff0080;
      cursor: pointer;
      
      &::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff0080, #00ff88);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 0, 128, 0.8);
        }
      }
      
      &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff0080, #00ff88);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
      }
    }

    .volume-glow {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.2), transparent);
      transition: all 0.5s ease;
      opacity: 0;
    }
  }
`;