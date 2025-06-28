import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from '../utils/StateProvider';

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();

  return (
    <Container>
      <div className="search__bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder='Search for tracks, artists, or albums...' />
        <div className="search-glow"></div>
      </div>
      <div className="avatar">
        <div className="user-info">
          <CgProfile className="profile-icon" />
          <span className="username">{userInfo?.userName || 'User'}</span>
        </div>
        <div className="avatar-glow"></div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background: 
    linear-gradient(145deg, rgba(26, 0, 51, 0.95), rgba(42, 0, 64, 0.9)),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(255, 0, 128, 0.05) 2px,
      rgba(255, 0, 128, 0.05) 4px
    );
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #ff0080;
  box-shadow: 0 5px 20px rgba(255, 0, 128, 0.2);
  z-index: 10;

  .search__bar {
    background: linear-gradient(145deg, #1a0033, #2a0040);
    width: 40%;
    padding: 1rem 1.5rem;
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 2px solid #ff0080;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 
        0 0 20px rgba(255, 0, 128, 0.4),
        inset 0 0 20px rgba(0, 255, 136, 0.1);
      transform: translateY(-2px);
    }

    &:focus-within {
      border-color: #00ff88;
      box-shadow: 
        0 0 25px rgba(0, 255, 136, 0.5),
        inset 0 0 20px rgba(255, 0, 128, 0.1);
    }

    .search-icon {
      color: #00ff88;
      font-size: 1.2rem;
      filter: drop-shadow(0 0 5px currentColor);
    }

    input {
      border: none;
      background: transparent;
      height: 2rem;
      width: 100%;
      color: #00ff88;
      font-family: 'Courier Prime', monospace;
      font-size: 1rem;
      font-weight: 700;
      
      &::placeholder {
        color: rgba(0, 255, 136, 0.6);
        font-style: italic;
      }
      
      &:focus {
        outline: none;
      }
    }

    .search-glow {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.2), transparent);
      transition: left 0.5s ease;
    }

    &:focus-within .search-glow {
      left: 100%;
    }
  }

  .avatar {
    background: linear-gradient(145deg, #ff0080, #cc0066);
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #00ff88;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 10px 25px rgba(255, 0, 128, 0.4),
        0 0 30px rgba(0, 255, 136, 0.3);

      .avatar-glow {
        opacity: 1;
      }
    }

    .user-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      font-family: 'Orbitron', monospace;
      position: relative;
      z-index: 2;

      .profile-icon {
        font-size: 1.8rem;
        background: linear-gradient(145deg, #2a0040, #1a0030);
        padding: 0.3rem;
        border-radius: 50%;
        color: #00ff88;
        border: 2px solid #00ff88;
        filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.5));
      }

      .username {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      }
    }

    .avatar-glow {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: all 0.5s ease;
      opacity: 0;
    }
  }
`;