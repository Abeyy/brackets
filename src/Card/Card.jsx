import React from 'react';
import axios from 'axios';
import './Card.css'

function Card (props) {
  async function getDotaTeams () {
    let response = await axios.get('https://api.opendota.com/api/teams');
    return response
  }

  getDotaTeams().then(data => console.log(data))
  return (
    <div className="card-component">
      <div className="team-logo-container">
        <img src={props.teamLogo} alt="Team Logo" />
      </div>
      <div className="team-metadata-container">
        <h1>{props.teamName}</h1>
        <h2>{props.teamSubText}</h2>
      </div>
    </div>
  );
}

export default Card;
