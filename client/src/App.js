import { useState, useEffect } from 'react';
import axios from 'axios';
import { accessToken, logout, getCurrentUserProfile, getCurrentUserPlaylists, getUserTracks } from './spotify';
import styled, {createGlobalStyle} from 'styled-components/macro';
import { Login, Home } from './pages';
import {GlobalStyle} from './styles';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <GlobalStyle/>
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <div style={{float: 'right', padding: '10px'}}>
              <button onClick={logout} className='logout'>Log Out</button>
            </div>
            <Home />
          </>
        )}
      </header>
    </div>
  );
}

export default App;

