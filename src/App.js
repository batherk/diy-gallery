import React from 'react';
import './App.css';

export default class App extends React.Component {

  constructor(props){ 
    super(props);
    this.state = {
      currentPictureTheme : '',   // holds the current picture theme
      currentSoundTheme : '',     // holds the current sound theme
      currentTextTheme : '',      // holds the current text theme
      currentPictures : [],       // current theme pictures
      currentSounds : [],         // current theme sounds
      currentTexts : [],          // current theme texts
      choosenPicture : '',        // current picture in artwork
      choosenSound : '',          // current sound in artwork
      choosenText : ''            // current text in artwork
    }; 
  }

  // sets the new picture theme and loads pictures related to the new theme
  changePictureTheme = async function (themeNr) {
    this.setState({
      currentPictureTheme : themeNr
    });
    if (themeNr === 1) {
      //TODO: AJAX fetch pic1.svg, pic2.svg, pic3.svg and pic4.svg
    }
    if (themeNr === 2) {
      //TODO: AJAX fetch pic5.svg, pic6.svg, pic7.svg and pic8.svg
    }
    if (themeNr === 3) {
      //TODO: AJAX fetch pic9.svg, pic10.svg, pic11.svg and pic12.svg
    }
    this.setState({
      currentPictures : [] //fetched values
    });
  }

  // sets the new sounds theme and loads sounds related to the new theme
  changeSoundTheme = async function (themeNr) {
    this.setState({
      currentSoundTheme : themeNr
    });
    if (themeNr === 1) {
      //lyd ved audio-tag fra HTML5
    }
    if (themeNr === 2) {
      //lyd ved audio-tag fra HTML5
    }
    if (themeNr === 3) {
      //lyd ved audio-tag fra HTML5
    }
    this.setState({
      currentSounds : [] //fetched values
    });
  }

  // sets the new text theme and loads texts related to the new theme
  changeTextTheme = async function (themeNr) {
    this.setState({
      currentTextTheme : themeNr
    });
    if (themeNr === 1) {
      //AJAX fetch ./texts-cat1.text1, -text2, -text3 and -text4
    }
    if (themeNr === 2) {
      //AJAX fetch ./texts-cat2.text1, -text2, -text3 and -text4
    }
    if (themeNr === 3) {
      //AJAX fetch ./texts-cat3.text1, -text2, -text3 and -text4
    }
    this.setState({
      currentTexts : [] //fetched values
    });
  }

  // makes the choosen audio file start to play
  play() {
    // TODO: fill with appropriate action
  }

  // combines the choosen elements to create the displayed artwork
  renderArtwork() {
    const { currentPictures, currentSounds, currentTexts, choosenPicture, choosenSound, choosenText } = this.state
    return (
      <div className="artwork-parent">
        {/* TODO: combine currentPicture[choosenPicture], currentSounds[choosenSound] and currentTexts[choosenText]*/}
        HERE COMES AMAZING ART..
      </div>
    )
  }

  // the parent render of the react component
  render() {
    const { 
      currentPictureTheme, 
      currentSoundTheme, 
      currentTextTheme, 
    } = this.state

    return (
      <div className="parent-element">

        <header>EXAMPLE HEADER..</header>

        <div className="theme-choice-container">
          <button className="picture-theme-button" onClick={ () => this.changePictureTheme(1) }>Bilde-tema 1</button>
          <button className="picture-theme-button" onClick={ () => this.changePictureTheme(2) }>Bilde-tema 2</button>
          <button className="picture-theme-button" onClick={ () => this.changePictureTheme(3) }>Bilde-tema 3</button>
          <button className="sound-theme-button" onClick={ () => this.changeSoundTheme(1) }>Lyd-tema 1</button>
          <button className="sound-theme-button" onClick={ () => this.changeSoundTheme(2) }>Lyd-tema 2</button>
          <button className="sound-theme-button" onClick={ () => this.changeSoundTheme(3) }>Lyd-tema 3</button>
          <button className="text-theme-button" onClick={ () => this.changeTextTheme(1) }>Text-tema 1</button>
          <button className="text-theme-button" onClick={ () => this.changeTextTheme(2) }>Text-tema 2</button>
          <button className="text-theme-button" onClick={ () => this.changeTextTheme(3) }>Text-tema 3</button>
        </div>

        <div className="combination-choice-container">
          <button className="picture-choice-button" onClick={ () => this.setState({ choosenPicture: 0 }) }>
            tema {currentPictureTheme} - Bilde1
          </button>
          <button className="picture-choice-button" onClick={ () => this.setState({ choosenPicture: 1 }) }>
            tema {currentPictureTheme} - Bilde2
          </button>
          <button className="picture-choice-button" onClick={ () => this.setState({ choosenPicture: 2 }) }>
            tema {currentPictureTheme} - Bilde3
          </button>
          <button className="picture-choice-button" onClick={ () => this.setState({ choosenPicture: 3 }) }>
            tema {currentPictureTheme} - Bilde4
          </button>

          <button className="sound-choice-button" onClick={ () => this.setState({ choosenSound: 0 }) }>
            tema {currentSoundTheme} - Sang1
          </button>
          <button className="sound-choice-button" onClick={ () => this.setState({ choosenSound: 1 }) }>
            tema {currentSoundTheme} - Sang2
          </button>
          <button className="sound-choice-button" onClick={ () => this.setState({ choosenSound: 2 }) }>
            tema {currentSoundTheme} - Sang3
          </button>
          <button className="sound-choice-button" onClick={ () => this.setState({ choosenSound: 3 }) }>
            tema {currentSoundTheme} - Sang4
          </button>

          <button className="text-choice-button" onClick={ () => this.setState({ choosenText: 0 }) }>
            tema {currentTextTheme} - text1
          </button>
          <button className="text-choice-button" onClick={ () => this.setState({ choosenText: 1 }) }>
            tema {currentTextTheme} - text2
          </button>
          <button className="text-choice-button" onClick={ () => this.setState({ choosenText: 2 }) }>
            tema {currentTextTheme} - text3
          </button>
          <button className="text-choice-button" onClick={ () => this.setState({ choosenText: 3 }) }>
            tema {currentTextTheme} - text4
          </button>

        </div>

        <div className="artwork-container">
          {this.renderArtwork()}
        </div>

        <div className="play-button-container">
          <button className="play-button" onClick={() => this.play()}>Play artwork</button>
        </div>

      </div>
    )
  }
}
