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
      menuOpen: false                             // holds value controlling menu rendering
    }; 
  }

  componentDidMount(){
    
    this.setState({
      currentPictureTheme : JSON.parse(localStorage.getItem("currentPictureTheme")),
      currentSoundTheme : JSON.parse(localStorage.getItem("currentSoundTheme")),
      currentTextTheme : JSON.parse(localStorage.getItem("currentTextTheme")),
    })
  }

  // sets the new picture theme
  handleChangePictureTheme = async function (themeNr) {
    this.setState({
      currentPictureTheme : themeNr
    });
    localStorage.setItem("currentPictureTheme", JSON.stringify(themeNr))

  }

  // sets the new sounds theme and reset the artworks
  handleChangeSoundTheme = async function (themeNr) {
    this.setState({
      currentSoundTheme : themeNr
    });
    localStorage.setItem("currentSoundTheme", JSON.stringify(themeNr))
  }

  // sets the new text theme
  handleChangeTextTheme = async function (themeNr) {
    this.setState({
      currentTextTheme : themeNr
    });
    localStorage.setItem("currentTextTheme", JSON.stringify(themeNr))
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
          <button className="picture-theme-button" onClick={ () => this.handleChangePictureTheme(1) }>South park</button>
          <button className="picture-theme-button" onClick={ () => this.handleChangePictureTheme(2) }>Dyrenes verden</button>
          <button className="picture-theme-button" onClick={ () => this.handleChangePictureTheme(3) }>It's a sign</button>
          <button className="sound-theme-button" onClick={ () => this.handleChangeSoundTheme(1) }>Nature</button>
          <button className="sound-theme-button" onClick={ () => this.handleChangeSoundTheme(2) }>Instrumental</button>
          <button className="sound-theme-button" onClick={ () => this.handleChangeSoundTheme(3) }>Farkost</button>
          <button className="text-theme-button" onClick={ () => this.handleChangeTextTheme(1) }>Trøndelag</button>
          <button className="text-theme-button" onClick={ () => this.handleChangeTextTheme(2) }>Life quotes</button>
          <button className="text-theme-button" onClick={ () => this.handleChangeTextTheme(3) }>Kort og godt</button>
        </div>
        
      </div>
    )
  }
}
