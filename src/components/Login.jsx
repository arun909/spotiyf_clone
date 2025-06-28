import React from "react";
import styled from "styled-components";

export default function Login() {
    const handleClick = () => {
      const client_id = "00a864d07fc944318a4c55cf975caea3";
      const redirecturl = "http://localhost:3000/";
      const apiurl ="https://accounts.spotify.com/authorize";
      const scope = [
        "user-read-email",
        "user-read-private",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-top-read",
      ];
      window.location.href = `${apiurl}?client_id=${client_id}&redirect_uri=${redirecturl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    }

    return (
    <Container>
      <div className="retro-frame">
        <div className="scan-lines"></div>
        <div className="content">
          <div className="logo-container">
            <h1 className="retro-title">RETRO BEATS</h1>
            <div className="subtitle">~ Music Player ~</div>
          </div>
          
          <div className="vinyl-record">
            <div className="vinyl-outer">
              <div className="vinyl-inner">
                <div className="vinyl-center">
                  <div className="vinyl-hole"></div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleClick} className="retro-button">
            <span className="button-text">CONNECT TO SPOTIFY</span>
            <div className="button-glow"></div>
          </button>

          <div className="retro-text">
            Experience music like it's 1985
          </div>
        </div>
      </div>
    </Container>
    );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: 
    radial-gradient(circle at 20% 80%, #ff0080 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, #00ff88 0%, transparent 50%),
    linear-gradient(135deg, #1a0033 0%, #330066 50%, #4d0080 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(255, 0, 128, 0.03) 2px,
        rgba(255, 0, 128, 0.03) 4px
      );
    pointer-events: none;
  }

  .retro-frame {
    position: relative;
    background: linear-gradient(145deg, #2a0040, #1a0030);
    border: 3px solid #ff0080;
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 
      0 0 30px rgba(255, 0, 128, 0.5),
      inset 0 0 30px rgba(0, 255, 136, 0.1);
    backdrop-filter: blur(10px);
    max-width: 500px;
    width: 90%;
  }

  .scan-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 136, 0.05) 2px,
      rgba(0, 255, 136, 0.05) 4px
    );
    pointer-events: none;
    border-radius: 17px;
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .retro-title {
    font-family: 'Orbitron', monospace;
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(45deg, #ff0080, #00ff88, #ff0080);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease-in-out infinite;
    text-shadow: 0 0 20px rgba(255, 0, 128, 0.5);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-family: 'Courier Prime', monospace;
    color: #00ff88;
    font-size: 1.2rem;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .vinyl-record {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    animation: spin 8s linear infinite;
  }

  .vinyl-outer {
    width: 120px;
    height: 120px;
    background: linear-gradient(45deg, #1a1a1a, #333);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 0 20px rgba(0, 0, 0, 0.8),
      inset 0 0 20px rgba(255, 0, 128, 0.2);
  }

  .vinyl-inner {
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #2a2a2a, #1a1a1a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vinyl-center {
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #ff0080, #00ff88);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vinyl-hole {
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 50%;
  }

  .retro-button {
    position: relative;
    background: linear-gradient(145deg, #ff0080, #cc0066);
    border: 2px solid #00ff88;
    color: #fff;
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    overflow: hidden;
    margin: 2rem 0;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 10px 25px rgba(255, 0, 128, 0.4),
        0 0 30px rgba(0, 255, 136, 0.3);
      border-color: #ff0080;
    }

    &:active {
      transform: translateY(0);
    }
  }

  .button-text {
    position: relative;
    z-index: 2;
  }

  .button-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .retro-button:hover .button-glow {
    left: 100%;
  }

  .retro-text {
    font-family: 'Courier Prime', monospace;
    color: #00ff88;
    font-size: 1rem;
    letter-spacing: 1px;
    opacity: 0.8;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;