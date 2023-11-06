import './PlaylistsGrid.css';

const PlaylistsGrid = ({ track }) => (
  <div className="topTracks__inner" >
    <button className='top_track_item'>
    <ul className='top_tracks_attributes'>

      <li className='top_track_album_img'>{track.album.images.length && track.album.images[2] && (
          <div className="track__item__img" style={{maxWidth: "85%", height: 'auto'}}>
          <img src={track.album.images[2].url} alt={track.name} />
          </div>
          )}
      </li>

      <li className='name+artists' style={{textAlign: 'left', width: '50%'}}>
        <div className="track__item__name overflow-ellipsis" style={{fontSize:"16px", fontWeight: "500", lineHeight: "20pt"}}> {track.name} </div>
        <div className="track__item__artist overflow-ellipsis">
          {track.artists.map((artist, i) => (
              <span key={i} onCanPlay style={{ fontWeight: "400", color: "var(--light-grey)"}}> {artist.name}{i !== track.artists.length - 1 && ', '} </span>
          ))}
        </div>
      </li>

      <li className='top_tracks_niche overflow-ellipsis'>
      <div> <h3 style={{textAlign: "right", margin: "0px"}}>{(100 - track.popularity).toFixed(2)}<span style={{ fontWeight: "400", color: "var(--light-grey)" }}> / 100</span></h3> </div>
      </li>

    </ul>
    </button>
  </div>
);

export default PlaylistsGrid;