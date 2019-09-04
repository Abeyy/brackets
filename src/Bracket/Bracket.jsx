import React, {Component} from 'react';
import axios from 'axios';

import './Bracket.css'
import Card from '../Card/Card.jsx';

class Bracket extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      dotaTeams: [],
      currentToolTip: {
        index: '',
        round: ''
      }
    }
    
    this.toggle = this.toggle.bind(this);
    this.clearToggle = this.clearToggle.bind(this);
    this.calculatePotentialWinner = this.calculatePotentialWinner.bind(this);
    this.assembleBracketTeams = this.assembleBracketTeams.bind(this);
  }
  
  componentDidMount () {
    axios.get('https://api.opendota.com/api/teams').then ((response) => {
        let returnedTeams = response.data.slice(0,16)
        let sortedTeamsArray = [];
        while (returnedTeams.length !== 0) {
          sortedTeamsArray.push(returnedTeams[0])
          sortedTeamsArray.push(returnedTeams[returnedTeams.length - 1])
          
          returnedTeams.shift();
          returnedTeams.pop();
        }
        this.setState({dotaTeams: sortedTeamsArray})
    })
  }
  
  toggle (index, round) {
    let toolTipObj = {
      index: index,
      round: round
    }
    
    this.setState({currentToolTip: toolTipObj})
  }
  clearToggle () {
    let emptyObj = {
      index: '',
      round: ''
    }
    this.setState({currentToolTip: emptyObj})
  }
  calculatePotentialWinner (firstTeam, secondTeam) {
    return firstTeam.rating > secondTeam.rating ? firstTeam : secondTeam
  }
  assembleBracketTeams (teamsArray, round, idFilter) {
    let compiledBracketSection = [];
    let winningIds = [];
    let filteredTeamsArray = [];
    
    if (idFilter) {
      teamsArray.forEach((team, index) => {
        if (idFilter.includes(team.team_id)) {
          filteredTeamsArray.push(team)
        }
      })
    } else {
      filteredTeamsArray = teamsArray
    }
    
    for (let i = 0; i < filteredTeamsArray.length; i += 2) {
      let winningId = this.calculatePotentialWinner(filteredTeamsArray[i], filteredTeamsArray[i+1]).team_id
      winningIds.push(winningId)
      
      compiledBracketSection.push(
        <div className="card-container" key={i+round}>
          <div className={"single-bracket-card"} iswinner={filteredTeamsArray[i].team_id === winningId ? 1 : 0} onMouseOver={() => this.toggle(filteredTeamsArray[i].team_id, round)} onMouseLeave={this.clearToggle}>
            <Card currentToolTip={this.state.currentToolTip} isWinner={filteredTeamsArray[i].team_id === winningId} currentRound={round} teamObj={filteredTeamsArray[i]} />
          </div>
          <div className="single-bracket-card" iswinner={filteredTeamsArray[i+1].team_id === winningId ? 1 : 0} onMouseOver={() => this.toggle(filteredTeamsArray[i+1].team_id, round)} onMouseLeave={this.clearToggle}>
            <Card currentToolTip={this.state.currentToolTip} isWinner={filteredTeamsArray[i+1].team_id === winningId} currentRound={round} teamObj={filteredTeamsArray[i+1]} />
          </div>
        </div>
      )
    }
    
    return [compiledBracketSection, winningIds];
  }
  render () {
      let [firstRoundTeams, secondRoundIDs] = this.assembleBracketTeams(this.state.dotaTeams, "firstRound");
      let [secondRoundTeams, thirdRoundIDs] = this.assembleBracketTeams(this.state.dotaTeams, "secondRound", secondRoundIDs);
      let [thirdRoundTeams, finalRoundIDs] = this.assembleBracketTeams(this.state.dotaTeams, "thirdRound", thirdRoundIDs);
      let [finalTeams] = this.assembleBracketTeams(this.state.dotaTeams, "finalRound", finalRoundIDs);
       
      return (
        <div className="bracket-component">
          <div className="bracket-heading">
            <h1>Dota 2 Premier Tournament</h1>
            <h2>Sponsored by PlayVS</h2>
          </div>
          <div className="first-round-bracket">
            <div className="bracket-round-title">Play Ins Stage</div>
            {firstRoundTeams}
          </div>
          <div className="second-round-bracket">
            <div className="bracket-round-title">Quarterfinals</div>
            {secondRoundTeams}
          </div>
          <div className="third-round-bracket">
            <div className="bracket-round-title">Semifinals</div>
            {thirdRoundTeams}
          </div>
          <div className="fourth-round-bracket">
            <div className="bracket-round-title">Finals</div>
            {finalTeams}
          </div>     
        </div>
      )
  }
}

export default Bracket;