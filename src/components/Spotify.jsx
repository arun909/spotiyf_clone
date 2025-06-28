import React, { useEffect } from 'react';
import styled from "styled-components";
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Body from './Body';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        };

        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        console.log("Error getting user info:", error);
      }
    };
    
    if (token) {
      getUserInfo();
    }
  }, [dispatch, token]);

  return (
    <Container>
      <div className="retro-grid"></div>
      <div className='spotify_body'>
        <Sidebar />
        <div className='body'>
          <Navbar />
          <div className='body_contents'>
            <Body />
          </div>
        </div>
      </div>
      <div className='spotify_footer'>
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  background: 
    radial-gradient(circle at 20% 80%, #ff0080 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, #00ff88 0%, transparent 50%),
    linear-gradient(135deg, #1a0033 0%, #330066 50%, #4d0080 100%);
  position: relative;

  .retro-grid {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: 0;
  }

  .spotify_body {
    display: grid;
    grid-template-columns: 20vw 80vw;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    background: rgba(26, 0, 51, 0.8);
    backdrop-filter: blur(10px);
    border-left: 2px solid #ff0080;
  }
`;