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
  background-color: #181818 ;
  height: 100%;
  width: 100%;
  display: grid;
  border-top: 1px solid #282828;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr;
   justify-content: center;
   padding: 0 1rem;
`;