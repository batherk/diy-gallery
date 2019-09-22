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

  componentDidMount() {
    /*const { artNr, picTheme, soundTheme, textTheme } = this.props
    this.setState({
        artNr : artNr,
        picTheme : picTheme,
        soundTheme : soundTheme,
        textTheme : textTheme,
    })*/

    if(sessionStorage.getItem("sessionCombination")) { 
      this.fetchSessionStorage()
    } else {
      console.log("MOUNT BUILD")
      let artworks = [['','',''], ['','',''], ['','',''], ['','','']]
      this.buildArtwork(1, 1, 1, 1, artworks)
    }
  }

  componentDidUpdate() {
    const { picTheme, soundTheme, textTheme, artNr } = this.props

    let resetArtworks = this.state.artworks

    if(this.state.picTheme !== picTheme) {
      var i = 0
      for (i = 0; i < 4; i++) {
        resetArtworks[i][0] = ''
      }
      this.setState({ picTheme : this.props.picTheme, artworks : resetArtworks })
      console.log("pic BUILD")

      this.buildArtwork(artNr, picTheme, soundTheme, textTheme, resetArtworks)
    }

    if(this.state.soundTheme !== soundTheme) {
      var j = 0
      for (j = 0; j < 4; j++) {
        resetArtworks[j][1] = ''
      }
      this.setState({ soundTheme : this.props.soundTheme, artworks : resetArtworks })
      console.log("sound BUILD")

      this.buildArtwork(artNr, picTheme, soundTheme, textTheme, resetArtworks)
    }

    if(this.state.textTheme !== textTheme) {
      var k
      for (k = 0; k < 4; k++) {
        resetArtworks[k][2] = ''
      }
      this.setState({ textTheme : this.props.textTheme, artworks : resetArtworks })
      console.log("text BUILD")

      this.buildArtwork(artNr, picTheme, soundTheme, textTheme, resetArtworks)
    }

    if(this.state.artNr !== artNr) {
      this.setState({ artNr : artNr })
      console.log("art BUILD")

      this.buildArtwork(artNr, picTheme, soundTheme, textTheme, resetArtworks)
    }

/*

    // handles artwork change
    if(this.props.artNr !== this.state.artNr) {
      this.recreateArtwork()

      // checks if the relative artwork position already has a fil connected to it
      if(this.state.artworks[this.props.artNr-1][0] ) {
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

    }*/
  }

  fetchSessionStorage = async () => {
    const { artNr, picTheme, soundTheme, textTheme } = this.state

    const sessionCombination = sessionStorage.getItem("sessionCombination")
    const artworks = await JSON.parse(sessionCombination)
    this.setState({ artworks : artworks })
    this.buildArtwork(artNr, picTheme, soundTheme, textTheme, artworks)
  }

  updateSessionStorage(updatedStorage){
    sessionStorage.setItem("sessionCombination", JSON.stringify(updatedStorage))
  }

  // recreates an already set artwork or generates elements if necessary
  buildArtwork = async (artNr, picTheme, soundTheme, textTheme, artworks) => {
    //const { artworks, artNr, picTheme, soundTheme, textTheme } = this.state

    console.log(artworks[artNr-1])

    let picPath = ''
    let sound = ''
    let textPath = ''

    if(artworks[artNr-1][0]) {
      console.log(artworks[artNr-1][0])

      picPath = artworks[artNr-1][0]
    } else {
      const picNames = ['feed.svg', 'feed2.svg', 'feed3.svg', 'feed4.svg'];
      picPath = 'pictures/theme'+ picTheme.toString() +'/'+ picNames[Math.floor(Math.random()*4)];
    }
    const fetchedPic = await fetch(picPath)
    const data = await fetchedPic.text()
    const pic = data

    if(artworks[artNr-1][1]) {
      console.log(artworks[artNr-1][1])

      sound = artworks[artNr-1][1]
    } else {
      sound = "sounds/theme" + soundTheme.toString() + "/Sound" + (Math.floor(Math.random()*4)+1).toString() + ".mp3"
    }

    if(artworks[artNr-1][2]) {
      console.log(artworks[artNr-1][2])

      textPath = artworks[artNr-1][2]
    } else {
      textPath = 'texts/theme' + textTheme.toString() + '/text' + (Math.floor(Math.random() * 4)+1).toString() + '.json'
    }
    const fetchedText = await fetch(textPath)
    const textFile = await fetchedText.json()
    const text = textFile.text

    let updatedArtworks = this.state.artworks
    updatedArtworks[artNr-1] = [picPath, sound, textPath]

    this.setState({
      chosenPic : pic,
      chosenText : text,
      chosenSound : sound,
      artworks : updatedArtworks
    })

    this.updateSessionStorage(updatedArtworks)

  }

  /*
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
    this.updateSessionStorage();
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
    this.updateSessionStorage()
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
    this.updateSessionStorage()
  }*/

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
