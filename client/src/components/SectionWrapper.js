import { Link } from 'react-router-dom';
import './SectionWrapper.css';

const SectionWrapper = ({ track, i }) => (
    <div className="section__inner">
      <button className='track_item'>
      <ul className='attributes'>

        <li className='index'><h3 style={{ fontWeight: "400", color: "var(--light-grey)"}}>{i+1}</h3></li>

        <li className='album_img'>{track.track.album.images.length && track.track.album.images[2] && (
            <div className="track__item__img">
            <img src={track.track.album.images[2].url} alt={track.track.name} />
            </div>
            )}
        </li>

        <li className='name_artists'>
          <div className="track__item__name overflow-ellipsis"> {track.track.name} </div>
          <div className="track__item__artist overflow-ellipsis">
            {track.track.artists.map((artist, i) => (
                <span key={i} className="track_artists"> {artist.name}{i !== track.track.artists.length - 1 && ', '} </span>
            ))}
          </div>
        </li>

        <li className='niche_index overflow-ellipsis'>
        <div style={{paddingTop: "5px"}}> 
          <h3>{(100 - track.track.popularity).toFixed(2)}</h3> 
        </div>
        </li>

        
        <li className='song_length'>
            <div style={{ fontWeight: "400", color: "var(--light-grey)" }}>
              {formatMillisecondsToMinutesSeconds(track.track.duration_ms)}
            </div>
        </li>

      </ul>
      </button>
    </div>
);

function formatMillisecondsToMinutesSeconds(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default SectionWrapper;