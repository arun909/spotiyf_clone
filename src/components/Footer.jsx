import React from 'react'
import styled from 'styled-components'  
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

export default function Footer() {
  return (
   <Container>
    <CurrentTrack />
    <PlayerControls />
    <Volume />
    </Container>
  );
}

const Container = styled.div`
  background: 
    linear-gradient(145deg, #1a0033, #2a0040),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(255, 0, 128, 0.05) 2px,
      rgba(255, 0, 128, 0.05) 4px
    );
  height: 100%;
  width: 100%;
  display: grid;
  border-top: 2px solid #ff0080;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: center;
  padding: 0 2rem;
  box-shadow: 
    0 -5px 20px rgba(255, 0, 128, 0.2),
    inset 0 0 20px rgba(0, 255, 136, 0.05);
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
`;