import React from 'react';
import styled from 'styled-components';

export default function LoadingScreen() {
  return (
    <Container>
      <div className="retro-frame">
        <div className="scan-lines"></div>
        <div className="content">
          <div className="logo-container">
            <h1 className="retro-title">RETRO BEATS</h1>
            <div className="subtitle">~ Loading ~</div>
          </div>
          
          <div className="loading-vinyl">
            <div className="vinyl-outer">
              <div className="vinyl-inner">
                <div className="vinyl-center">
                  <div className="vinyl-hole"></div>
                </div>
              </div>
            </div>
            <div className="loading-arm">
              <div className="arm-base"></div>
              <div className="arm-needle"></div>
            </div>
          </div>

          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-progress"></div>
              <div className="loading-glow"></div>
            </div>
            <div className="loading-text">INITIALIZING SYSTEM...</div>
          </div>

          <div className="retro-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="system-info">
            <div className="info-line">► CONNECTING TO SPOTIFY API</div>
            <div className="info-line">► LOADING RETRO INTERFACE</div>
            <div className="info-line">► PREPARING AUDIO SYSTEMS</div>
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
    max-width: 600px;
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
    animation: pulse 2s ease-in-out infinite;
  }

  .loading-vinyl {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .vinyl-outer {
    width: 150px;
    height: 150px;
    background: linear-gradient(45deg, #1a1a1a, #333);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 0 20px rgba(0, 0, 0, 0.8),
      inset 0 0 20px rgba(255, 0, 128, 0.2);
    animation: spin 3s linear infinite;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 2px solid rgba(255, 0, 128, 0.3);
      border-radius: 50%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 50%;
    }
  }

  .vinyl-inner {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #2a2a2a, #1a1a1a);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vinyl-center {
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #ff0080, #00ff88);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(255, 0, 128, 0.5);
  }

  .vinyl-hole {
    width: 12px;
    height: 12px;
    background: #000;
    border-radius: 50%;
  }

  .loading-arm {
    position: absolute;
    right: -20px;
    top: 20px;
    transform-origin: 100% 100%;
    animation: armMove 4s ease-in-out infinite;
  }

  .arm-base {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #ff0080, #00ff88);
    border-radius: 2px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      right: -5px;
      top: -3px;
      width: 10px;
      height: 10px;
      background: #ff0080;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
    }
  }

  .arm-needle {
    position: absolute;
    right: -8px;
    top: -1px;
    width: 15px;
    height: 2px;
    background: #00ff88;
    border-radius: 1px;
  }

  .loading-bar-container {
    margin: 2rem 0;
  }

  .loading-bar {
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, #1a0033, #2a0040);
    border: 2px solid #ff0080;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .loading-progress {
    height: 100%;
    background: linear-gradient(90deg, #ff0080, #00ff88, #ff0080);
    background-size: 200% 100%;
    border-radius: 3px;
    animation: loadingProgress 3s ease-in-out infinite;
  }

  .loading-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: loadingGlow 2s ease-in-out infinite;
  }

  .loading-text {
    font-family: 'Orbitron', monospace;
    color: #00ff88;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .retro-dots {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    gap: 0.5rem;

    .dot {
      width: 12px;
      height: 12px;
      background: #ff0080;
      border-radius: 50%;
      animation: dotPulse 1.5s ease-in-out infinite;
      box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);

      &:nth-child(2) {
        animation-delay: 0.3s;
        background: #00ff88;
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      }

      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
  }

  .system-info {
    margin-top: 2rem;
    text-align: left;
    
    .info-line {
      font-family: 'Courier Prime', monospace;
      color: #00ff88;
      font-size: 0.9rem;
      margin: 0.5rem 0;
      opacity: 0;
      animation: typewriter 0.5s ease-in-out forwards;
      
      &:nth-child(1) { animation-delay: 1s; }
      &:nth-child(2) { animation-delay: 2s; }
      &:nth-child(3) { animation-delay: 3s; }
    }
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes armMove {
    0%, 100% { transform: rotate(-10deg); }
    50% { transform: rotate(5deg); }
  }

  @keyframes loadingProgress {
    0% { width: 0%; background-position: 0% 50%; }
    50% { width: 70%; background-position: 100% 50%; }
    100% { width: 100%; background-position: 0% 50%; }
  }

  @keyframes loadingGlow {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.3); opacity: 1; }
  }

  @keyframes typewriter {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;