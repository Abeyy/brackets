import React from 'react';
import './Card.css'
import InfoCard from '../InfoCard/InfoCard.js';

function Card (props) {
  let teamMetaDataContainer;
  let hasWon = props.isWinner ? "W" : "L";
  if (props.winnerMode) {
    teamMetaDataContainer = (
      <div className="team-metadata-container small-container">
        <div className="winner-banner">Winner of</div>
        <h1 className="team-name-small">{props.teamName}</h1>
      </div>
    )
  } else {
    teamMetaDataContainer = (
      <div className="team-metadata-container">
        <h1>{props.teamObj.name}</h1>
        <h2>Rating: {props.teamObj.rating}</h2>
      </div>
    )
  }
  return (
    <div className="card-component">
      <div className="team-logo-container">
        <img src={props.teamObj.logo_url} alt=""/>
      </div>
      {teamMetaDataContainer}
      <div className="winner-display">
        {hasWon}
      </div>
      <InfoCard className="info-card-bracket" currentToolTip={props.currentToolTip} currentRound={props.currentRound} teamObj={props.teamObj} key={props.teamObj.team_id + props.currentRound} />
    </div>
  );
}

export default Card;
