import './ArtistGrid.css';

const ArtistGrid = ({ artist }) => (
    <div className="artist_inner">
      <button className='artist_item'>
      <ul className='artist_attributes'>
  
        <li className='top_artist_img'>{artist.images.length && artist.images[2] && (
            <div className="artist__item__img" style={{width: "55px", height: '55px', position: "relative", borderRadius: '50%', overflow: 'hidden'}}>
                <img src={artist.images[1].url} alt={artist.name} />
            </div>
            )}
        </li>
  
        <li className='top_artist_name'>
          <div className="artist__name overflow-ellipsis" style={{fontSize:"16px", fontWeight: "500", lineHeight: "20pt"}}> {artist.name} </div>
        </li>
  
        <li className='artist_niche_index overflow-ellipsis'>
        <div><h3 style={{textAlign: "right", margin: "0px"}}>{100-(artist.popularity.toFixed(2))}<span style={{ fontWeight: "400", color: "var(--light-grey)" }}> / 100</span></h3> </div>
        </li>
  
      </ul>
      </button>
    </div>
  );
  
  export default ArtistGrid;