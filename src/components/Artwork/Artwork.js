import React from 'react';
import './Artwork.css';


export default class Artwork extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      artworks : [['','',''], ['','',''], ['','',''], ['','','']],  
                                  // holds paths to artwork content within the given 
                                  // themes. Format: [picturePath, soundPath, textPath]
      artNr : 1,                  // position of active artwork
      textTheme : 1,              // holds current chosen text theme 
      chosenText : '',            // holds the current text in the artwork
      picTheme : 1,               // holds current chosen picture theme 
      chosenPic : [],             // holds the current picture in the artwork
      soundTheme : 1,             // holds current chosen sound theme 
      chosenSound : ''            // holds the current sound in the artwork
    }; 
  }

  componentDidUpdate() {
    // handles artwork change
    if(this.props.artNr !== this.state.artNr) {

      // checks if the relative artwork position already has a fil connected to it
      if(this.state.artworks[this.props.artNr-1][0]) {
        this.recreateArtwork(this.props.artNr-1)
      } 
      else {
        this.fetchPicfile(this.props.picTheme)
        this.fetchTextfile(this.props.textTheme)
        this.pickSoundfile(this.props.soundTheme)
      }
      this.setState({
        artNr : this.props.artNr
      })

    } else {

      // the following code handles change in one or more of the themes
      if(this.props.picTheme !== this.state.picTheme) {
        let resetArtworksTheme = this.state.artworks;
        var i = 0
        for (i = 0; i < 4; i++) {
          resetArtworksTheme[i][0] = ''
        }
        this.setState({
          picTheme : this.props.picTheme,
          artworks : resetArtworksTheme
        })
        this.fetchPicfile(this.props.picTheme);
      }

      if(this.props.soundTheme !== this.state.soundTheme) {
        let resetArtworksTheme = this.state.artworks;
        var j = 0
        for (j = 0; j < 4; j++) {
          resetArtworksTheme[j][1] = ''
        }
        this.setState({
          soundTheme : this.props.soundTheme,
          artworks : resetArtworksTheme
        })
        this.pickSoundfile(this.props.soundTheme)
      }

      if(this.props.textTheme !== this.state.textTheme) {
        let resetArtworksTheme = this.state.artworks;
        var k
        for (k = 0; k < 4; k++) {
          resetArtworksTheme[k][1] = ''
        }
        this.setState({
          textTheme : this.props.textTheme,
          artworks : resetArtworksTheme
        })
        this.fetchTextfile(this.props.textTheme)
      }
    }
    console.log(this.state.artworks)
  }

  // recreates an already set artwork
  recreateArtwork = async function (artNr) {
    let pic = []
    let text = ''
    let sound = ''

    const fetchedFile = await fetch(this.state.artworks[artNr][0])
    const data = await fetchedFile.text()
    pic = data

    const fetchedText = await fetch(this.state.artworks[artNr][2])
    const textFile = await fetchedText.json()
    text = textFile.text

    sound = this.state.artworks[artNr][1]

    this.setState({
      chosenPic : pic,
      chosenText : text,
      chosenSound : sound
    })
  }

  // fetches the correct picture locally
  fetchPicfile = async function (chosenTheme) {
    const picNames = ['feed.svg', 'feed2.svg', 'feed3.svg', 'feed4.svg']
    const randPicture = picNames[Math.floor(Math.random()*4)];
    const picPath = 'pictures/theme'+chosenTheme.toString()+'/'+randPicture
    let updatedArtworks = this.state.artworks
    updatedArtworks[this.props.artNr-1][0] = picPath
    fetch(picPath)
    .then(response => response.text())
    .then(data =>{
      this.setState({
        chosenPic : data,
        artworks : updatedArtworks
      })
    })    
  }

  // fetches the correct sound locally
  pickSoundfile = async function (chosenTheme) {
    const randSound = Math.floor(Math.random()*4)+1;
    const soundPath = "sounds/theme" +chosenTheme.toString()+ "/Sound" + randSound.toString() + ".mp3"
    let updatedArtworks = this.state.artworks
    updatedArtworks[this.props.artNr-1][1] = soundPath
    this.setState({
        chosenSound : soundPath,
        artworks : updatedArtworks
    })
  }

  // fetches a random text based on given theme as prop
  fetchTextfile = async function (chosenTheme) {
    const textPath = 'texts/theme' + chosenTheme.toString() + '/text' + (Math.floor(Math.random() * 4)+1).toString() + '.json'
    const fetchedText = await fetch(textPath)
    const textFile = await fetchedText.json()
    const text = textFile.text
    let updatedArtworks = this.state.artworks
    updatedArtworks[this.props.artNr-1][2] = textPath
    this.setState({
      chosenText : text,
      artworks : updatedArtworks
    })
  }

  // the parent render of the react component
  render() {
    const { chosenText, chosenPic, chosenSound } = this.state

    return (
      <div className="artwork-parent">

        <div className="svg-container">
            <div dangerouslySetInnerHTML={{__html: chosenPic}}/>
        </div>

        <div className="text-container">
            <p>
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
