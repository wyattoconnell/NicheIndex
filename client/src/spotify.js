import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

const getAccessToken = () => {
    

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    // If there's an error OR the token in localStorage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        logout();
    }

    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    // We should never get here!
    return false;
}

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
 export const logout = () => {
    // Clear all localStorage items
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage
    window.location = window.location.origin;
};


const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
      return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
};



export const accessToken = getAccessToken();

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getCurrentUserProfile = () => axios.get('/me');

export const getUserTracks = () => axios.get('/me/tracks');

export const getCurrentUserPlaylists = (limit = 50) => {
    return axios.get(`/me/playlists?limit=${limit}`);
  };

export const getArtistById = artist_id => {
return axios.get(`/artists/${artist_id}`);
}

export const getTop = type => {
    return axios.get(`/me/top/${type}?limit=5`);
};




