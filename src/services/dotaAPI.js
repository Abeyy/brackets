import axios from 'axios';

export const getTop16DotaTeams = () => {
  axios.get('https://api.opendota.com/api/teams').then ((response) => {
      return response.data.slice(0,15)
  })
}


