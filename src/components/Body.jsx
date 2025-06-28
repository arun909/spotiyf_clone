import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillClockCircle } from 'react-icons/ai';
import { reducerCases } from '../utils/Constants';

export default function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const playlistData = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith('<a') ? '' : response.data.description,
          images: response.data.images[0]?.url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2]?.url,
            duration: track.duration_ms,
            album: track.album.name,
            context_url: track.album.external_urls.spotify,
            track_number: track.track_number,
          })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: playlistData });
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };

    if (selectedPlaylistId && token) {
      getInitialPlaylist();
    }
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <Container>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <div className="vinyl-container">
                <img src={selectedPlaylist.images} alt={selectedPlaylist.name} />
                <div className="vinyl-overlay">
                  <div className="vinyl-hole"></div>
                </div>
              </div>
            </div>
            <div className="details">
              <span className="type">MIXTAPE</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
              <div className="track-count">{selectedPlaylist.tracks.length} tracks</div>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TRACK</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span className="clock__icon">
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                ({ id, name, artists, image, duration, album }, index) => {
                  return (
                    <div className="track__item" key={id}>
                      <div className="col track-number">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col">
                        <div className="track__info">
                          <div className="track-image-container">
                            <img src={image} alt={name} />
                            <div className="play-overlay">▶</div>
                          </div>
                          <div className="track__details">
                            <span className="track__name">{name}</span>
                            <span className="track__artists">{artists.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col album-name">
                        <span>{album}</span>
                      </div>
                      <div className="col duration">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  
  .playlist {
    margin-bottom: 3rem;
    display: flex;
    gap: 3rem;
    align-items: center;
    
    .image {
      flex: 0.3;
      
      .vinyl-container {
        position: relative;
        width: 200px;
        height: 200px;
        
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 
            0 0 30px rgba(255, 0, 128, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.3);
          border: 3px solid #ff0080;
          animation: spin 20s linear infinite;
        }
        
        .vinyl-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #1a0033, #2a0040);
          border-radius: 50%;
          border: 2px solid #00ff88;
          display: flex;
          align-items: center;
          justify-content: center;
          
          .vinyl-hole {
            width: 8px;
            height: 8px;
            background: #000;
            border-radius: 50%;
          }
        }
      }
    }
    
    .details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      .type {
        font-family: 'Orbitron', monospace;
        color: #ff0080;
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 3px;
        text-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
      }
      
      .title {
        color: #00ff88;
        font-family: 'Orbitron', monospace;
        font-size: 3rem;
        font-weight: 900;
        text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        margin: 0;
      }
      
      .description {
        color: rgba(0, 255, 136, 0.8);
        font-family: 'Courier Prime', monospace;
        font-size: 1rem;
        line-height: 1.5;
      }
      
      .track-count {
        color: #ff0080;
        font-family: 'Courier Prime', monospace;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }
  }
  
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.5fr 3fr 2fr 0.5fr;
      margin: 2rem 0 1rem;
      color: #ff0080;
      font-family: 'Orbitron', monospace;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 2px;
      padding: 1rem 2rem;
      background: linear-gradient(145deg, rgba(26, 0, 51, 0.8), rgba(42, 0, 64, 0.6));
      border: 2px solid #ff0080;
      border-radius: 10px;
      position: sticky;
      top: 15vh;
      backdrop-filter: blur(10px);
      box-shadow: 0 5px 20px rgba(255, 0, 128, 0.2);
      
      .clock__icon {
        display: flex;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
    
    .tracks {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .track__item {
        display: grid;
        grid-template-columns: 0.5fr 3fr 2fr 0.5fr;
        padding: 1rem 2rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        cursor: pointer;
        border: 1px solid transparent;
        font-family: 'Courier Prime', monospace;
        
        &:hover {
          background: linear-gradient(145deg, rgba(255, 0, 128, 0.1), rgba(0, 255, 136, 0.05));
          border-color: #ff0080;
          transform: translateX(10px);
          box-shadow: 0 5px 20px rgba(255, 0, 128, 0.2);
          
          .play-overlay {
            opacity: 1;
          }
          
          .track__name {
            color: #ff0080;
          }
        }
        
        .col {
          display: flex;
          align-items: center;
          
          &.track-number {
            justify-content: center;
            color: #00ff88;
            font-weight: 700;
            font-size: 1.1rem;
          }
          
          &.album-name {
            color: rgba(0, 255, 136, 0.8);
            font-weight: 700;
          }
          
          &.duration {
            justify-content: center;
            color: #ff0080;
            font-weight: 700;
          }
        }
        
        .track__info {
          display: flex;
          gap: 1rem;
          align-items: center;
          
          .track-image-container {
            position: relative;
            
            img {
              height: 3.5rem;
              width: 3.5rem;
              border-radius: 5px;
              border: 2px solid #ff0080;
              box-shadow: 0 0 10px rgba(255, 0, 128, 0.3);
            }
            
            .play-overlay {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0, 255, 136, 0.9);
              color: #1a0033;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.8rem;
              opacity: 0;
              transition: opacity 0.3s ease;
            }
          }
          
          .track__details {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            
            .track__name {
              color: #00ff88;
              font-weight: 700;
              font-size: 1rem;
              transition: color 0.3s ease;
            }
            
            .track__artists {
              color: rgba(0, 255, 136, 0.7);
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;