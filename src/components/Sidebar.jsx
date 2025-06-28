import React from 'react'
import styled from 'styled-components'  
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from './Playlists';

export default function Sidebar() {
  return ( 
    <Container>
      <div className='top_links'>
        <div className='logo'>
          <h1 className="retro-logo">RETRO BEATS</h1>
          <div className="logo-subtitle">Music Player</div>
        </div>
        <ul>
          <li className="nav-item">
            <MdHomeFilled />
            <span>Home</span>
            <div className="nav-glow"></div>
          </li>
          <li className="nav-item"> 
            <MdSearch />
            <span>Search</span>
            <div className="nav-glow"></div>
          </li>
          <li className="nav-item">
            <IoLibrary />
            <span>Your Library</span>
            <div className="nav-glow"></div>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  ); 
}

const Container = styled.div`
  background: 
    linear-gradient(145deg, #1a0033, #2a0040),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 0, 128, 0.05) 10px,
      rgba(255, 0, 128, 0.05) 20px
    );
  color: #00ff88;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-right: 2px solid #ff0080;
  box-shadow: inset -10px 0 20px rgba(255, 0, 128, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 136, 0.03) 2px,
      rgba(0, 255, 136, 0.03) 4px
    );
    pointer-events: none;
  }

  .top_links {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    
    .logo {
      text-align: center;
      margin: 2rem 0;
      padding: 1rem;
      border: 2px solid #ff0080;
      border-radius: 10px;
      background: linear-gradient(145deg, #2a0040, #1a0030);
      box-shadow: 
        0 0 20px rgba(255, 0, 128, 0.3),
        inset 0 0 20px rgba(0, 255, 136, 0.1);
      margin: 1rem;
      
      .retro-logo {
        font-family: 'Orbitron', monospace;
        font-size: 1.5rem;
        font-weight: 900;
        background: linear-gradient(45deg, #ff0080, #00ff88);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
        text-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
      }
      
      .logo-subtitle {
        font-family: 'Courier Prime', monospace;
        font-size: 0.8rem;
        color: #00ff88;
        letter-spacing: 2px;
        text-transform: uppercase;
        opacity: 0.8;
      }
    }
    
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      
      .nav-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        border: 1px solid transparent;
        font-family: 'Courier Prime', monospace;
        
        &:hover {
          color: #ff0080;
          background: linear-gradient(145deg, rgba(255, 0, 128, 0.1), rgba(0, 255, 136, 0.05));
          border-color: #ff0080;
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(255, 0, 128, 0.2);
          
          .nav-glow {
            opacity: 1;
          }
        }

        svg {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 5px currentColor);
        }

        span {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-glow {
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
    }
  }
`;