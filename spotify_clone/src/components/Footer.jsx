import React from 'react'
import styled from 'styled-components'  
import CurrentTrack from './CurrentTrack';
export default function m() {
  return (
   <Container>
    <CurrentTrack />
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
   padding: 10 1rem;
`;

