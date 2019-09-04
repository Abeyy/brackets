import React, {Component} from 'react';
import axios from 'axios'
import './InfoCard.css'

class InfoCard extends Component {
  constructor () {
    super()
    this.state = {
      currentTeamPlayers: [],
    }
  }
  componentDidMount () {
    axios.get(`https://api.opendota.com/api/teams/${this.props.teamObj.team_id}/players`).then ((response) => {
      let eligiblePlayers = [];
      response.data.forEach((player) => {
        if (player.is_current_team_member && eligiblePlayers.indexOf(player) === -1) {
          eligiblePlayers.push(player)
        }
      })
      this.setState({currentTeamPlayers: eligiblePlayers})
    })
  }
  render () {
    let playerElementList = [];
    this.state.currentTeamPlayers.forEach((player, index) => {
      playerElementList.push(
        <div className="player-info" key={player.account_id || index}>
          <div>{player.name}</div>
        </div>
      )
    })
    
    if (playerElementList.length === 0) {
      playerElementList.push(
        <div className="player-info">
          Team has no active players currently on their roster.
        </div>
      )
    }
    
    if (this.props.currentToolTip.index === this.props.teamObj.team_id && this.props.currentToolTip.round === this.props.currentRound) {
      return (
        <div className="info-card-component card">
          <h1 className="info-card-name">{this.props.teamObj.name}</h1>
          <div className="player-info-container">
            <div className="roster-title">Roster</div>
            {playerElementList}
          </div>
          <div className="team-info-container">
            <div><i>Tag:</i> {this.props.teamObj.tag}</div>
            <div><i>Win Ratio:</i> {(this.props.teamObj.wins/this.props.teamObj.losses).toFixed(2)} </div>
            <div><i>Active Players:</i> {this.state.currentTeamPlayers.length} </div>
          </div>
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }
  
  
}

export default InfoCard;