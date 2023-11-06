import './ScorePanel.css';


const ScorePanel = ({averagePopularity, tracks}) => (
    <div>
        <ul className="panelList">
            <div className="scoreClump">
                <h3 className="indexCaption">Overall Niche Index:</h3> 
                <li className="score">{averagePopularity}</li>
                <li className="total">/100</li>
            </div>
            <li className="blurb">Your overall niche index is the product of all your saved tracks and artists. It represents how unique your music taste is compared to other Spotify users, with a score of 100 being the most niche. </li>
        </ul>
    </div>
);



export default ScorePanel;