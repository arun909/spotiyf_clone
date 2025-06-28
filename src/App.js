import React, { useEffect, useState } from 'react';
import Login from './components/Login';  
import LoadingScreen from './components/LoadingScreen';
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import Spotify from './components/Spotify';

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setIsLoading(true);
      const token = hash.substring(1).split('&')[0].split('=')[1];
      console.log(token);
      
      // Simulate loading time for retro effect
      setTimeout(() => {
        dispatch({ type: reducerCases.SET_TOKEN, token });
        setIsLoading(false);
      }, 4000); // 4 second loading screen
    }
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>{token ? <Spotify /> : <Login />}</div>
  );
}