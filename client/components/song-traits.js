import React, {Component} from 'react';
import {connect} from 'react-redux';
import BarChart from './bar-chart';
import RadarChart from './radar-chart';
import {setCurrentSong} from '../store';
import {editSongTraitNames} from '../../utils.js'

class SongTraits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSong: this.props.currentSong,
      currentSongTraits: this.props.currentSongTraits,
      selectedChart: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    window.scroll(0, 0);
    const currentSongId = this.props.match.params.songId;
    const currentSong = this.props.songs.filter(song => song.id === currentSongId)[0];
    this.props.setCurrentSong(currentSong);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentSong !== this.props.currentSong) {
      this.setState({
        currentSong: newProps.currentSong,
        currentSongTraits: newProps.currentSongTraits
      })
    }
  }

  handleClick() {
    this.setState({
      selectedChart: !this.state.selectedChart
    })
  }

  render() {
    const songName = this.state.currentSong.name || ''
    const songArtists = this.state.currentSong.artists ? this.state.currentSong.artists[0].name : []
    if (!this.state.currentSongTraits) return <div />;
    else {
      return (
        <div className="main">
          <div className="container">
            <h2 className="graph-title">{songName} by {songArtists}</h2>

            <label className="switch">
              <input onClick={this.handleClick}type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <div>
            {this.state.selectedChart ?
            <RadarChart data={this.state.currentSongTraits} />
            : <BarChart data={this.state.currentSongTraits} />
            }
          </div>
        </div>
      )
    }
  }
}

// Container
const mapState = state => {
  let currentSongTraits = state.allSongTraits.filter(songEl => songEl.id === state.currentSong.id)[0]
  let songTraitsEdited = currentSongTraits ? editSongTraitNames(currentSongTraits) : null
  return {
    currentSongTraits: songTraitsEdited,
    currentSong: state.currentSong,
    songs: state.songs
  }
}

const mapDispatch = {setCurrentSong}

export default connect(mapState, mapDispatch)(SongTraits);
