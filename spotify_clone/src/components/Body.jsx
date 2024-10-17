import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillClockCircle } from 'react-icons/ai';

export default function Body() {
  const [{ token, selectedPlaylistId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getIntialPlaylist = async () => {
      console.log(selectedPlaylistId);
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log(response.data);
    };

    getIntialPlaylist();
  }, [token, selectedPlaylistId]);

  return <Container>Body</Container>;
}

// Define the Container styled-component here
const Container = styled.div`
  // Your container styles here
`;

