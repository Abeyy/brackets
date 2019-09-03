import React from 'react';
import './Card.css'

function Card (props) {
  return (
    <div className="card-component">
      <div className="team-logo-container">
        <img src={props.logo} alt="Team Logo" />
      </div>
      <div className="team-metadata-container">
        <h1>{props.teamName}</h1>
        <h2>Rating {props.rating}</h2>
      </div>
    </div>
  );
}

export default Card;
