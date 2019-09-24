import React from 'react';
import './App.css';
import Artwork from './components/Artwork/Artwork';

export default class App extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      currentArtworkNr : 1,                       // holds the current artwork nr
      currentPictureTheme : 1,                    // holds the current picture theme
      currentSoundTheme : 1,                      // holds the current sound theme
      currentTextTheme : 1,                       // holds the current text theme
      menuOpen: false                             // holds value controlling menu rendering
    }; 
  }

  componentDidMount(){
    if(localStorage.getItem("currentArtworkNr")) {
      this.setState({
        currentArtworkNr : JSON.parse(localStorage.getItem("currentArtworkNr"))
      })
    } else {
      localStorage.setItem("currentArtworkNr", JSON.stringify(1))
    }
    if(localStorage.getItem("currentPictureTheme")) {
      this.setState({
        currentPictureTheme : JSON.parse(localStorage.getItem("currentPictureTheme")),
      })
    } else {
        localStorage.setItem("currentPictureTheme", JSON.stringify(1))
    }
    if(localStorage.getItem("currentSoundTheme")) {
      this.setState({
        currentSoundTheme : JSON.parse(localStorage.getItem("currentSoundTheme"))
      })
    } else {
      localStorage.setItem("currentSoundTheme", JSON.stringify(1))
    }
    if(localStorage.getItem("currentTextTheme")) {
      this.setState({
        currentTextTheme : JSON.parse(localStorage.getItem("currentTextTheme"))
      })
    } else {
      localStorage.setItem("currentTextTheme", JSON.stringify(1))
    }
  }

  // sets the new picture theme
  handleChangePictureTheme = (themeNr) => {
    this.setState({
      currentPictureTheme : themeNr
    });
    localStorage.setItem("currentPictureTheme", JSON.stringify(themeNr))
  }

  // sets the new sounds theme and reset the artworks
  handleChangeSoundTheme = (themeNr) => {
    this.setState({
      currentSoundTheme : themeNr
    });
    localStorage.setItem("currentSoundTheme", JSON.stringify(themeNr))
  }

  // sets the new text theme
  handleChangeTextTheme = (themeNr) => {
    this.setState({
      currentTextTheme : themeNr
    });
    localStorage.setItem("currentTextTheme", JSON.stringify(themeNr))
  }

  // sets the new artwork number
  handleChangeArtwork = function (artworkNr) {
    this.setState({
      currentArtworkNr : artworkNr
    });
    localStorage.setItem("currentArtworkNr", JSON.stringify(artworkNr))
  }

  // Toggles hamburger menu
  menuHandler = () =>{
    this.setState((prevState) => {
      return {menuOpen:!prevState.menuOpen}
    });
  };

  // the parent render of the react component
  render() {
    const { currentPictureTheme, currentSoundTheme, currentTextTheme, currentArtworkNr } = this.state

    return (
      <div className="parent-element">
        <div className={this.state.menuOpen ? "overlay menu-open" : "overlay"} onClick={ () => this.menuHandler()}></div>
        <header>
          <div className={this.state.menuOpen ? "hamburger-cont menu-open" : "hamburger-cont"} onClick={ () => this.menuHandler()}>
            <button className="menu-button"></button>
            <div className="hamburger"><div></div></div>
          </div>
          <h1>The DIY Gallery</h1>
        </header>
        <div className="artwork-choice-container">
          <button className={"artwork-button" + (currentArtworkNr === 1 ? " chosen" : "")}
            onClick={ () => this.handleChangeArtwork(1) }>Artwork 1
          </button>
          <button className={"artwork-button" + (currentArtworkNr === 2 ? " chosen" : "")}
            onClick={ () => this.handleChangeArtwork(2) }>Artwork 2
          </button>
          <button className={"artwork-button" + (currentArtworkNr === 3 ? " chosen" : "")}
            onClick={ () => this.handleChangeArtwork(3) }>Artwork 3
          </button>
          <button className={"artwork-button" + (currentArtworkNr === 4 ? " chosen" : "")}
            onClick={ () => this.handleChangeArtwork(4) }>Artwork 4
          </button>
        </div>

        <div className="artwork-container">         
          <Artwork
            picTheme = {currentPictureTheme}
            soundTheme = {currentSoundTheme}
            textTheme = {currentTextTheme}
            artNr = {currentArtworkNr}
          />
        </div>

        <div className={this.state.menuOpen ? "theme-choice-container menu-open" : "theme-choice-container"}>
          <h4>Bilde kategori:</h4>
          <button className={"theme-button" + (currentPictureTheme === 1 ? " chosen" : "")}
            onClick={ () => this.handleChangePictureTheme(1) }>Logo
          </button>
          <button className={"theme-button" + (currentPictureTheme === 2 ? " chosen" : "")} 
            onClick={ () => this.handleChangePictureTheme(2) }>Dyr
            </button>
          <button className={"theme-button" + (currentPictureTheme === 3 ? " chosen" : "")} 
            onClick={ () => this.handleChangePictureTheme(3) }>Skilt
          </button>

          <h4>Lyd kategori:</h4>
          <button className={"theme-button" + (currentSoundTheme === 1 ? " chosen" : "")}
            onClick={ () => this.handleChangeSoundTheme(1) }>Natur
          </button>
          <button className={"theme-button" + (currentSoundTheme === 2 ? " chosen" : "")}
            onClick={ () => this.handleChangeSoundTheme(2) }>Instrument
          </button>
          <button className={"theme-button" + (currentSoundTheme === 3 ? " chosen" : "")}
            onClick={ () => this.handleChangeSoundTheme(3) }>Farkost
          </button>

          <h4>Tekst kategori:</h4>
          <button className={"theme-button" + (currentTextTheme === 1 ? " chosen" : "")}
            onClick={ () => this.handleChangeTextTheme(1) }>DDE
          </button>
          <button className={"theme-button" + (currentTextTheme === 2 ? " chosen" : "")}
            onClick={ () => this.handleChangeTextTheme(2) }>Livet
          </button>
          <button className={"theme-button" + (currentTextTheme === 3 ? " chosen" : "")}
            onClick={ () => this.handleChangeTextTheme(3) }>Ordtak
          </button>
        </div>
        
      </div>
    )
  }
}
