import React from 'react';
import './App.css';
import Artwork from './components/Artwork/Artwork';

export default class App extends React.Component {

  constructor(props){ 
    super(props);
    this.state = {
      currentPictureTheme : 1,                    // holds the current picture theme
      currentSoundTheme : 1,                      // holds the current sound theme
      currentTextTheme : 1,                       // holds the current text theme
      currentArtworkNr : 1,                       // holds the current artwork nr
      artworks : ['','','',''],                   // holds the current artworks
      artworkFav : [false, false, false, false],  // if the artworks has been saved
      menuOpen: false
    }; 
  }

  // reset artworks and checks storage for artworks built from the new themes
  handleThemeChange = function () {
    this.setState({
      artworks : ['','','',''],
      artworkFav : [false, false, false, false]
    })

    //TODO : check local storage and session storage for current combination of themes
    //TODO : set right artwork to stored artwork
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

  // Toggles hamburger menu
  menuHandler = () =>{
    this.setState((prevState) =>{
      return {menuOpen:!prevState.menuOpen}
    });
  };
  
  // renders an artwork
  renderArtwork() {
    const { currentPictureTheme, currentSoundTheme, currentTextTheme, currentArtworkNr } = this.state
    return (
      <Artwork
        picTheme = {currentPictureTheme}
        soundTheme = {currentSoundTheme}
        textTheme = {currentTextTheme}
        artNr = {currentArtworkNr}
      />
    )
  }

  // the parent render of the react component
  render() {
    let themeChoiceContainerClass = "theme-choice-container";
    if(this.state.menuOpen){
      themeChoiceContainerClass = "theme-choice-container menu-open";
    }

    return (
      <div className="parent-element">

        <header>
          <button className="menu-button" onClick={ () => this.menuHandler()}>Menu</button>
          EXAMPLE HEADER..
        </header>

        <div className="artwork-choice-container">
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(1) }>Artwork 1</button>
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(2) }>Artwork 2</button>
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(3) }>Artwork 3</button>
          <button className="artwork-button" onClick={ () => this.handleChangeArtwork(4) }>Artwork 4</button>
        </div>

        <div className="artwork-container">         
          {this.renderArtwork()}
        </div>

        <div className={themeChoiceContainerClass}>
          <button className="close-menu" onClick={ () => this.menuHandler()}>CloseMenu</button>
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
      </div>
    )
  }
}
