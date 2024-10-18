import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider"; // Make sure to import useStateProvider
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
    const [{ token, currentlyPlaying}, dispatch] = useStateProvider();
    
    useEffect(() => {
        const getCurrentTrack = async () => {
            
                const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',
                     {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
                if(response.data !==""){
                   const {item} = response.data;
                   const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                };
           
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
            } 
         };

        getCurrentTrack(); // Corrected function name call
    }, [token, dispatch]);

    return (
        <Container>
            {
                currentlyPlaying && (
                    <div className="track">
                        <div className="track__image">
                        <img src={currentlyPlaying.image} alt="Currentlyplaying" />
                        </div>
                        <div className="track_info">
                            <h4>{currentlyPlaying.name}</h4>
                            <p>{currentlyPlaying.artists.join(", ")}</p>
                        </div>
                    </div>
                )}
        </Container>
    );
}

const Container = styled.div`

.track{
    display: flex;
    align-items: center;
    gap: 1rem;
    .track__image{
        img{
            height: 5rem;
        }
    }
    .track_info{
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        h4{
            color: white;
        }
        p{
            color: #b3b3b3;
        }
    }
}
`;
