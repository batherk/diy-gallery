import React from 'react';
import './Artwork.css';


export default class Artwork extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      artNr : '',
      textTheme : '',
      currentTextfile : '',
      chosenText : '',
      picTheme : '',
      chosenPic : [],
      soundTheme : '',
      chosenSound : ''
    }; 
  }

  componentDidUpdate() {
    if(this.props.artNr !== this.state.artNr 
            || this.props.textTheme !== this.state.textTheme 
            || this.props.picTheme !== this.state.picTheme
            || this.props.soundTheme !== this.state.soundTheme)
    {
      this.fetchTextfile(this.props.textTheme)
      this.fetchPicfile(this.props.picTheme)
      // add sound fetch if necessary
      this.setState({
        artNr : this.props.artNr,
        textTheme : this.props.textTheme,
        picTheme : this.props.picTheme,
        soundTheme : this.props.soundTheme
      })
    }
  }

  // fetches the correct picture locally
  fetchPicfile = async function (chosenTheme) {
    const picNames = ['feed.svg', 'feed2.svg', 'feed3.svg', 'feed4.svg']
    const randPicture = picNames[Math.floor(Math.random()*4)];
    fetch('pictures/theme'+chosenTheme.toString()+'/'+randPicture)
    .then(response => response.text())
    .then(data =>{
      this.setState({
        chosenPic : data
      })
    })    
  }

  // fetches the correct text file based on given theme as prop
  fetchTextfile = async function (chosenTheme) {
    const url = 'texts-theme'+chosenTheme.toString()+'.json'
    const fetchedFile = await fetch(url)
    const textFile = await fetchedFile.json()
    this.setState({
      currentTextfile : textFile
    })
    this.chooseRandomText();
  }

  // pick a random text from the loaded json file containing texts
  chooseRandomText() {
    const { currentTextfile } = this.state
    const texts = [currentTextfile.text1, currentTextfile.text2, currentTextfile.text3, currentTextfile.text4]
    const chosenText = texts[Math.floor(Math.random() * 4)];
    this.setState({
      chosenText : chosenText
    })
  }

  // makes the choosen audio file start playing
  handlePlay() {
    // TODO: fill with appropriate action
  }


  // saves the current artwork to storage
  handleSave = function () {
    //TODO : save the current artwork and its positon to local storage
  }


  // the parent render of the react component
  render() {
    const { chosenText, chosenPic } = this.state

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
          <button className="play-button" onClick={() => this.handlePlay()}>Play sound</button>
        </div>
        <div className="save-button-container">
          <button className="save-button" onClick={() => this.handleSave()}>Save artwork</button>
        </div>

      </div>
    )
  }
}
