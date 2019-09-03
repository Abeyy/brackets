import React, {Component} from 'react';
import axios from 'axios';

import './Bracket.css'
import Card from '../Card/Card.jsx';

class Bracket extends Component{
  constructor(props) {
    super(props);
    this.state = {
      top4Teams: [],
      dotaTeams: []
    }
  }
  componentDidMount () {
    axios.get('https://api.opendota.com/api/teams').then ((response) => {
        this.setState({top4Teams: response.data.slice(0,4)})
        this.setState({dotaTeams: response.data.slice(5,15)})
    })
  }
  
  render () {
      let firstRoundTeams = [];
      let secondRoundTeams = [];
      let firstRoundTeamsCopy = this.state.dotaTeams;
      
      while (firstRoundTeamsCopy.length !== 0) {
        firstRoundTeams.push(
          <div className="card-container" key={firstRoundTeamsCopy[0].team_id}>
            <Card teamName={firstRoundTeamsCopy[0].name} logo={firstRoundTeamsCopy[0].logo_url} rating={firstRoundTeamsCopy[0].rating} />
          </div>
        )
        firstRoundTeams.push(
          <div className="card-container" key={firstRoundTeamsCopy[firstRoundTeamsCopy.length - 1].team_id}>
            <Card teamName={firstRoundTeamsCopy[firstRoundTeamsCopy.length - 1].name} logo={firstRoundTeamsCopy[firstRoundTeamsCopy.length - 1].logo_url} rating={firstRoundTeamsCopy[firstRoundTeamsCopy.length - 1].rating} />
          </div>
        )
        firstRoundTeamsCopy.shift()
        firstRoundTeamsCopy.pop()
      }
      
      this.state.top4Teams.forEach((team) => {
        secondRoundTeams.push(
          <div className="card-container" key={team.team_id}>
            <Card teamName={team.name} logo={team.logo_url} rating={team.rating} />
          </div>
        )
      })
      return (
        <div className="bracket-component">
          <div className="first-round-bracket">
            {firstRoundTeams}
          </div>
          <div className="second-round-bracket">
            {secondRoundTeams}
          </div>
          <div className="third-round-bracket">
            <Card teamName="TBD" />
            <Card teamName="TBD" />
          </div>
        </div>
      )
  }
  // async function getDotaTeams () {
  //   let response = await axios.get('https://api.opendota.com/api/teams');
  //   // The assumption here is that the api returns the teams in order based on ELO:
  //   // TODO: Write a method to check and sort by ELO
  //   let top16Teams = response.data.slice(0,15)
  //   return top16Teams
  // }
  
  // getDotaTeams().then((data) => {
  //   data.forEach((team) => {
  //     setDotaTeams(team)
  //   })
  // })
}

export default Bracket;