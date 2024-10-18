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
          images: response.data.images[0]?.url, // Using optional chaining to avoid errors
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2]?.url, // Using optional chaining
            duration: track.duration_ms,
            album: track.album.name,
            context_url: track.album.external_urls.spotify, // Corrected property name
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
              <img src={selectedPlaylist.images} alt={selectedPlaylist.name} />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
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
                ({ id, name, artists, image, duration, album, context_url, track_number }, index) => {
                  return (
                    <div className="track__item" key={id}>
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col">
                        <div className="track__info">
                          <img src={image} alt={name} />
                          <div className="track__details">
                            <span className="track__name">{name}</span>
                            <span className="track__artists">{artists.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>
                         { msToMinutesAndSeconds(duration) }
                        </span>
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
  .playlist{
    margin: 0 2rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    .image{
        flex: 0.8;
        img{
           height: 15rem;
           box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px; 
        }
    }
    .details{ 
        display: flex;
        flex-direction: column;
        color: #e0dede;
        gap: 1rem;
        .title{
            color: white;
            font-size: 4rem;
        }
       
    }
  }
    .list{
        .header__row{
            display: grid;
            grid-template-columns: 0.5fr 3fr 2fr 0.5fr;
            margin: 1rem 0;
            color: #b3b3b3;
            position: sticky;
            top: 15vh;
            padding: 1rem 3rem;
            transition: 0.3s ease-in-out;
            background-color:${({ headerBackground}) => headerBackground ? '#000000dc' : 'none'}; ;
            }
        }
        .tracks{
            margin: 0 2rem;
            display: flex;
            flex-direction: column;
            .track__item{
                display: grid;
                grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
                margin: 0.3rem 0;
                
                .track__info{
                    display: flex;
                    gap: 1rem;
                    img{
                        height: 3.5rem;
                    }
                    .track__details{
                        display: flex;
                        flex-direction: column;
                        gap: 0.2rem;
                        .track__name{
                            color: white;
                        }
                    }
                }
            }
        }
    }
`;

