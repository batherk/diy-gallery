import React from 'react';
import './Artwork.css';


export default class Artwork extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      artworks : [['','',''], ['','',''], ['','',''], ['','','']],  
                                  // holds paths to artwork content within the given 
                                  // themes. Format: [picturePath, soundPath, textPath]
      artNr : JSON.parse(localStorage.getItem("currentArtworkNr")),                  
                                  // holds the current artwork nr
      picTheme : JSON.parse(localStorage.getItem("currentPictureTheme")),               
                                  // holds the current picture theme
      soundTheme : JSON.parse(localStorage.getItem("currentSoundTheme")),             
                                  // holds the current sound theme
      textTheme : JSON.parse(localStorage.getItem("currentTextTheme")),              
                                  // holds the current text theme              
      chosenPic : [],             // holds the current picture in the artwork
      chosenSound : '',           // holds the current sound in the artwork
      chosenText : '',            // holds the current text in the artwork
    }; 
  } 

  componentDidMount() {
    if(sessionStorage.getItem("sessionCombination")) { 
      this.fetchSessionStorage()
    } else {
      this.setPicture()
      this.setSound()
      this.setText()
    }
  }

  componentDidUpdate() {
    const { artNr, picTheme, soundTheme, textTheme } = this.state

    if (this.props.artNr !== artNr) {
      this.setState({ artNr : this.props.artNr })
      this.setPicture()
      this.setSound()
      this.setText()
    }

    if (this.props.picTheme !== picTheme) {
      this.resetArtworksTheme(0)
      this.setState({ picTheme : this.props.picTheme })
      this.setPicture()
    }

    if (this.props.soundTheme !== soundTheme) {
      this.resetArtworksTheme(1)
      this.setState({ soundTheme : this.props.soundTheme })
      this.setSound()
    }

    if (this.props.textTheme !== textTheme) {
      this.resetArtworksTheme(2)
      this.setState({ textTheme : this.props.textTheme })
      this.setText()
    }
  }

  // sets values within given category to '' after change of theme
  resetArtworksTheme = (theme) => {
    let resetArtworks = this.state.artworks
    let i = 0
      for (i = 0; i < 4; i++) {
        resetArtworks[i][theme] = ''
      }
      this.setState({ 
        artworks : resetArtworks 
      })
  }

  // fetches values stored in session storage and saves them in this.state.artworks
  fetchSessionStorage = async () => {
    const artworks = await JSON.parse(sessionStorage.getItem("sessionCombination"));
    this.setState({ artworks : artworks })
    this.setPicture()
    this.setSound()
    this.setText()
  }

  // exports newly set values to session storage
  updateSessionStorage = () => {
    sessionStorage.setItem("sessionCombination", JSON.stringify(this.state.artworks))
  }
  
  // fetches a given or a random picture within given theme
  setPicture = async () => {
    const { artNr, picTheme } = this.props;
    const { artworks } = this.state;
    let picturePath = '';
    if (artworks[artNr-1][0]) {
      picturePath = artworks[artNr-1][0];
    } else {
      const theme = picTheme.toString()
      const randomFile = Math.floor(Math.random()*4).toString()
      picturePath = 'pictures/theme' + theme + '/feed' + randomFile + '.svg';
    }
    let updatedArtworks = artworks;
    updatedArtworks[artNr-1][0] = picturePath;
    const fetchedPic = await fetch(picturePath)
    const data = await fetchedPic.text()
    const pic = data
    this.setState({
      chosenPic : pic,
      artworks : updatedArtworks
    })
    this.updateSessionStorage();
  }

  // fetches a given or a random sound within given theme
  setSound = async () => {
    const { artNr, soundTheme } = this.props;
    const { artworks } = this.state;
    let soundPath = ''
    if (artworks[artNr-1][1]) {
      soundPath = artworks[artNr-1][1];
    } else {
      const theme = soundTheme.toString()
      const randomFile = Math.floor(Math.random()*4+1).toString()
      soundPath = "sounds/theme" + theme + "/Sound" + randomFile + ".mp3"
    }
    let updatedArtworks = artworks
    updatedArtworks[artNr-1][1] = soundPath
    this.setState({
        chosenSound : soundPath,
        artworks : updatedArtworks
    })
    this.updateSessionStorage()
  }

  // fetches a given or a random text within given theme
  setText = async () => {
    const { artNr, textTheme } = this.props;
    const { artworks } = this.state;
    let textPath = ''
    if (artworks[artNr-1][2]) {
      textPath = artworks[artNr-1][2];
    } else {
      const theme = textTheme.toString()
      const randomFile = (Math.floor(Math.random() * 4)+1).toString()
      textPath = 'texts/theme' + theme + '/text' + randomFile + '.json'
    }
    const fetchedText = await fetch(textPath)
    const textFile = await fetchedText.json()
    const text = textFile.text
    let updatedArtworks = artworks
    updatedArtworks[this.props.artNr-1][2] = textPath
    this.setState({
      chosenText : text,
      artworks : updatedArtworks
    })
    this.updateSessionStorage()
  }

  // the parent render of the react component
  render() {
    const { chosenText, chosenPic, chosenSound } = this.state

    return (
      <div className="artwork-parent">

        <div className="svg-container" dangerouslySetInnerHTML={{__html: chosenPic}}>
        </div>

        <div className="text-container">
            <p className="chosen-text">
                {chosenText}
            </p>
        </div>

        <div className="sound-container">
          <audio ref="audio_tag" src={chosenSound} controls></audio>
        </div>
      </div>
    )
  }
}
