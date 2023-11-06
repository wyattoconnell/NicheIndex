import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Home.css';
import { accessToken, logout, getCurrentUserProfile, getCurrentUserPlaylists, getUserTracks, getArtistById, getTop } from '../spotify';
  import {
    SectionWrapper,
    PlaylistsGrid,
    ArtistGrid, 
    ScorePanel
  } from '../components';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [tracksData, setTracksData] = useState(null);
    const isFetchingDataRef = useRef(false);
    const [playlistsData, setPlaylistsData] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [firstEffectDone, setFirstEffectDone] = useState(false);
    const [secondEffectDone, setSecondEffectDone] = useState(false);



    
 //tracks, and top data 
    useEffect(() => {
      const fetchData = async () => {
  
        try {
          const { data } = await getCurrentUserProfile();
          setProfile(data);
  
        } catch(e) {
          console.error(e);
        }

        try {
        const { data } = await getTop('artists');
        setTopArtists(data);
        

        } catch(e) {
        console.error(e);
        }

        try {
        const { data } = await getTop('tracks');
        Promise.all(data.items.map(async (track) => {
            
          const id = track.artists[0].id;
          const { data } = await getArtistById(id);
          track.popularity = (track.popularity + (0.1 * data.popularity))/1.1;
        }))
        setTopTracks(data);

        } catch(e) {
        console.error(e);
        }

        if (!isFetchingDataRef.current) {
            isFetchingDataRef.current = true;
            try {
                const { data } = await getUserTracks();
                setTracksData(data)
            } catch (e) {
                console.error(e);
            } finally {
                isFetchingDataRef.current = false;
            }
        }
      };
  
      fetchData();

      setFirstEffectDone(true);
    }, []);

//assign tracks- refresh if necessary
    useEffect(() => {
        if (!tracksData) {
        return;
        }

        const fetchMoreData = async () => {
            if (!isFetchingDataRef.current && tracksData.next) {
              isFetchingDataRef.current = true;
              try {
                const { data } = await axios.get(tracksData.next);
                setTracksData(data);
              } catch (e) {
                console.error(e);
              } finally {
                isFetchingDataRef.current = false;
              }
            }
          };

        fetchMoreData();

        Promise.all(tracksData.items.map(async (track) => {
            
              const id = track.track.artists[0].id;
              const { data } = await getArtistById(id);
              track.track.popularity = (track.track.popularity + (0.1 * data.popularity))/1.1;
            
          }))
            .then(() => {
              setTracks(prevTracks => ([
                ...prevTracks ? prevTracks : [],
                ...tracksData.items
              ]));
            })
            .catch((error) => {
              console.error(error);
            });

          setSecondEffectDone(true);

    }, [tracksData]);
 
    function sortNichest(tracks) {
      if (tracks) {
        const sortedTracks = [...tracks];
        sortedTracks.sort((a, b) => {
          if (a.track.popularity > b.track.popularity) return 1;
          if (a.track.popularity < b.track.popularity) return -1;
          return 0;
        });
        return sortedTracks;
      }
      return [];
    }

      function sortBasic(tracks) {
        if (tracks) {
          const sortedTracks = [...tracks];
          sortedTracks.sort((a, b) => {
            if (a.track.popularity > b.track.popularity) return -1;
            if (a.track.popularity < b.track.popularity) return 1;
            return 0;
          });
          return sortedTracks;
        }
        return [];
      }

      function sortRecent(tracks) {
        if (tracks) {
          const sortedTracks = [...tracks];
          sortedTracks.sort((a, b) => {
            const timestampA = new Date(a.added_at);
            const timestampB = new Date(b.added_at);
            if (timestampA < timestampB) {
              return 1;
            }
            if (timestampA > timestampB) {
              return -1;
            }
            return 0;
          });
          return sortedTracks;
        }
        return [];
      }
      

  let averagePopularity = 0;
  if (tracksData && topArtists && topTracks) {
    let totalPopularity = 0;
    let numTracks = tracksData.items.length;

    for (const item of tracksData.items) {
        totalPopularity += item.track.popularity;
    }
    const tracksAverage = totalPopularity / numTracks;

    totalPopularity = 0;
    numTracks = topArtists.items.length;

    for (const item of topArtists.items) {
        totalPopularity += item.popularity;
    }
    const artistsAverage = totalPopularity / numTracks;

    totalPopularity = 0;
    numTracks = topTracks.items.length;

    for (const item of topTracks.items) {
        totalPopularity += item.popularity;
    }
    const toptracksAverage = totalPopularity / numTracks;

    averagePopularity = ((tracksAverage + artistsAverage + toptracksAverage)/3).toFixed(1);
  }

  if (tracks) {console.log(tracks)}



  return (
    <>
      {profile && tracks && tracksData && topTracks && topArtists &&(
        <div>
          <div className="header">
          <h1 className="welcome">Welcome, {profile.display_name}</h1>
          <h3 style= {{paddingBottom: "4%"}}>You have {tracksData.total} saved tracks... <span style={{color: 'var(--green)'}}>but are they uniquely yours?</span></h3>
          <ScorePanel averagePopularity = {averagePopularity} tracks = {tracks}></ScorePanel>
          </div>
                <div>
                    <ul className='top_display'>
                        <li className='topTracks'>
                        <div className='tracksDiv'>
                          <h2 className= "topTitle">Top Tracks and Artists</h2>
                          <h4 className= "topSub">Check out the Niche Indices for the music you've been listening to most lately:</h4>
                        </div>    
                            {topTracks.items.map((track, i) => (
                                <PlaylistsGrid track = {track}></PlaylistsGrid>
                            ))}
                        </li>
                        <li className='topArtists'>
                            {topArtists.items.map((artist, i) => (
                                <ArtistGrid artist = {artist}></ArtistGrid>
                            ))}
                        </li>
                    </ul>
                    
                </div>
                <div className='trackList'>
                    <h2 className="tracksTitle">Saved Tracks</h2>
                    <div class="dropdown">
                      <button class="dropbtn" style = {{borderRadius: "2px", color: "var(--light-grey)"}}>Sort ↓</button>
                      <div class="dropdown-content">
                        <button onClick = {() => setTracks(sortRecent(tracks))}>Date added</button>
                        <button onClick = {() => setTracks(sortNichest(tracks))}>Most niche</button>
                        <button onClick = {() => setTracks(sortBasic(tracks))}>Least niche</button>
                      </div>
                    </div>
                    <div className="songDiv">
                      <button className='songBar'>
                            <ul className='catagories'>
                                <li>#</li>
                                <li>TITLE</li>
                                <li>NICHE INDEX</li>
                            </ul>
                      </button>
                          {tracks.map((track, i) => (
                              <SectionWrapper track={track} i={i}></SectionWrapper>
                          ))}
                    </div>
                </div>
        </div>
            )}
    </>
  )
};

export default Home;