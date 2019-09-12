import React from 'react';
import './App.css';
import Artwork from './components/Artwork/Artwork'

export default class App extends React.Component {

  constructor(props){ 
    super(props);
    this.state = {
      currentPictureTheme : '',                 // holds the current picture theme
      currentSoundTheme : '',                   // holds the current sound theme
      currentTextTheme : '',                    // holds the current text theme
      currentArtworkNr : '',                    // holds the current artwork nr
      artworks : ['','','',''],                 // holds the current artworks
      artworkFav : [false, false, false, false] // if the artworks has been saved
    }; 
  }

  // reset artworks and checks storage for artworks built from the new themes
  handleThemeChange = function () {
    this.setState({
      artwork1 : '',
      artwork2 : '',
      artwork3 : '',
      artwork4 : ''
    })

    //TODO : check local storage and session storage for current combination of themes
    //TODO : set right artwork to stored artwork
    //TODO : set stored artwork as favourited
  }

  // sets the new picture theme
  handleChangePictureTheme = async function (themeNr) {
    this.setState({
      currentPictureTheme : themeNr
    });
    this.handleThemeChange()
  }

  // sets the new sounds theme and reset the artworks
  handleChangeSoundTheme = async function (themeNr) {
    this.setState({
      currentSoundTheme : themeNr
    });
    this.handleThemeChange()
  }

  // sets the new text theme
  handleChangeTextTheme = async function (themeNr) {
    this.setState({
      currentTextTheme : themeNr
    });
    this.handleThemeChange()
  }

  // sets the new arrtwork
  handleChangeArtwork = function (artworkNr) {
    this.setState({
      currentArtworkNr : artworkNr
    });
  }

  // saves the current artwork to storage and mark it as a favourit
  handleSave = function () {
    //TODO : save the current artwork and its positon to local storage
    //TODO : mark current as fav = true
  }
  
  // renders an artwork from state or returns a new one
  renderArtwork() {
    const { currentArtworkNr, artworks, currentPictureTheme, currentSoundTheme, currentTextTheme } = this.state
    if (artworks[currentArtworkNr]) {
      return artworks[currentArtworkNr]
    }
    let newArtwork =  <Artwork
                        picTheme = {currentPictureTheme}
                        soundTheme = {currentSoundTheme}
                        textTheme = {currentTextTheme}
                      />
    let updatedArtworks = artworks
    updatedArtworks[currentArtworkNr] = newArtwork
    this.setState ({
      artworks : updatedArtworks
    })
    
    // TODO : save new artwork and its positon to session storage

    return (
      <div>
        {newArtwork}
      </div>
    )
  }

  // the parent render of the react component
  render() {

    return (
      <div className="parent-element">

        <header>EXAMPLE HEADER..</header>

        <div className="artwork-choice-container">
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(1) }>Artwork 1</button>
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(2) }>Artwork 2</button>
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(3) }>Artwork 3</button>
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(4) }>Artwork 4</button>
        </div>

        <div className="artwork-container">
          {this.renderArtwork()}
        </div>

        <div className="theme-choice-container">
          <button className="picture-theme-button" onClick={ () => this.handleChangePictureTheme(1) }>Bilde-tema 1</button>
          <button className="picture-theme-button" onClick={ () => this.handleChangePictureTheme(2) }>Bilde-tema 2</button>
          <button className="picture-theme-button" onClick={ () => this.handleChangePictureTheme(3) }>Bilde-tema 3</button>
          <button className="sound-theme-button" onClick={ () => this.handleChangeSoundTheme(1) }>Lyd-tema 1</button>
          <button className="sound-theme-button" onClick={ () => this.handleChangeSoundTheme(2) }>Lyd-tema 2</button>
          <button className="sound-theme-button" onClick={ () => this.handleChangeSoundTheme(3) }>Lyd-tema 3</button>
          <button className="text-theme-button" onClick={ () => this.handleChangeTextTheme(1) }>Text-tema 1</button>
          <button className="text-theme-button" onClick={ () => this.handleChangeTextTheme(2) }>Text-tema 2</button>
          <button className="text-theme-button" onClick={ () => this.handleChangeTextTheme(3) }>Text-tema 3</button>
        </div>

        <div className="save-button-container">
          <button className="save-button" onClick={() => this.handleSave()}>Save artwork</button>
        </div>

      </div>
    )
  }
}
