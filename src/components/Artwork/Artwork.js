import React from 'react';
import './Artwork.css';


export default class Artwork extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      artworks : [['','',''], ['','',''], ['','',''], ['','','']],  
                                  // holds paths to artwork content within the given 
                                  // themes. Format: [picturePath, soundPath, textPath]
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
    const { artworks, artNr, picTheme, soundTheme, textTheme, mounted } = this.state

    let resetArtworks = artworks

    if (this.props.artNr !== artNr) {
      this.setState({ artNr : this.props.artNr })
      this.setPicture(this.props.artNr, this.props.picTheme)
      this.setSound(this.props.artNr, this.props.soundTheme)
      this.setText(this.props.artNr, this.props.textTheme)
    }

    if (this.props.picTheme !== picTheme) {
      var i = 0
      for (i = 0; i < 4; i++) {
        resetArtworks[i][0] = ''
      }
      this.setState({ 
        picTheme : this.props.picTheme,
        artworks : resetArtworks 
      })
      this.setPicture()
    }

    if (this.props.soundTheme !== soundTheme) {
      var j = 0
      for (j = 0; j < 4; j++) {
        resetArtworks[j][1] = ''
      }
      this.setState({ 
        soundTheme : this.props.soundTheme, 
        artworks : resetArtworks })
      this.setSound()
    }

    if (this.props.textTheme !== textTheme) {
      var k
      for (k = 0; k < 4; k++) {
        resetArtworks[k][2] = ''
      }
      this.setState({ 
        textTheme : this.props.textTheme, 
        artworks : resetArtworks 
      })
      this.setText()
    }
  }

  fetchSessionStorage = async () => {
    const artworks = await JSON.parse(sessionStorage.getItem("sessionCombination"));
    await this.setState({ artworks : artworks })
    this.setPicture()
    this.setSound()
    this.setText()
  }

  updateSessionStorage = () => {
    sessionStorage.setItem("sessionCombination", JSON.stringify(this.state.artworks))
  }
  
  // fetches the correct picture locally
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

  // fetches the correct sound locally
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

  // fetches a random text based on given theme as prop
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
