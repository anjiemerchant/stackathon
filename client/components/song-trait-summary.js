import React, {Component} from 'react';
import {connect} from 'react-redux';
import BarChart from './bar-chart'
import RadarChart from './radar-chart'

class SongTraitSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedChart: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      selectedChart: !this.state.selectedChart
    })
  }

  render() {
      return (
        <div className="main">
          <div className="container">
          <h2>A quantitative summary of your music taste, derived from averaging the following measures across your top songs (n = 50)</h2>
            <label className="switch">
              <input onClick={this.handleClick} type="checkbox" />
              <span className="slider round" />
            </label>
          </div>

          <div>
            {this.state.selectedChart ?
           <RadarChart data={this.props.allSongTraits} />
            : <BarChart data={this.props.allSongTraits} />
            }
          </div>
        </div>
      )
    }
  }

// Container
const mapState = state => {

  // const obj = {}
  // state.allSongTraits.forEach(el => {
  //     let key = el.trait;
  //     if (key === "acousticness" || key === "danceability" || key === "energy" || key === "instrumentalness" || key === "liveness" || key === "speechiness" || key === "valence") {
  //       obj[key] = obj[key] || { count: 0, total: 0, avg: 0 };
  //       obj[key].count++;
  //       obj[key].total += el.val;
  //       obj[key].avg = obj[key].total / obj[key].count;
  //     }
  //   })

  const acousticness = state.allSongTraits ? state.allSongTraits.map(trait => trait.acousticness)
                                                                .reduce((acc, val) => acc + val, 0) : null
  const danceability = state.allSongTraits ? state.allSongTraits.map(trait => trait.danceability)
                                                                .reduce((acc, val) => acc + val, 0) : null
  const energy  = state.allSongTraits ? state.allSongTraits.map(trait => trait.energy)
                                                           .reduce((acc, val) => acc + val, 0) : null
  const instrumentalness  = state.allSongTraits ?  state.allSongTraits.map(trait => trait.instrumentalness)
                                                                      .reduce((acc, val) => acc + val, 0) : null
  const liveness  = state.allSongTraits ? state.allSongTraits.map(trait => trait.liveness)
                                                             .reduce((acc, val) => acc + val, 0) : null
  const speechiness  = state.allSongTraits ? state.allSongTraits.map(trait => trait.speechiness)
                                                                .reduce((acc, val) => acc + val, 0) : null
  const valence  = state.allSongTraits ? state.allSongTraits.map(trait => trait.valence)
                                                            .reduce((acc, val) => acc + val, 0) : null

  const length = state.allSongTraits ? state.allSongTraits.length : null

  const songTraitsEdited = [
    {trait: "acousticness", value: acousticness / length},
    {trait: "danceability", value: danceability / length},
    {trait: "energy", value: energy / length},
    {trait: "instrumentalness", value: instrumentalness / length},
    {trait: "liveness", value: liveness / length},
    {trait: "speechiness", value: speechiness / length},
    {trait: "valence", value: valence / length}
  ]

  return ({
    allSongTraits: songTraitsEdited
  })
}

export default connect(mapState, null)(SongTraitSummary);
