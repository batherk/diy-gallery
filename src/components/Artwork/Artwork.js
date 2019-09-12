import React from 'react';
import './Artwork.css';

export default class Artwork extends React.Component {

    //TODO in component: receive props picTheme, soundTheme, textTheme
    //TODO in component: generate a random artwork given the themes above

  constructor(props){
    super(props);
    this.state = {
      textTheme : '',
      currentTextfile : '',
      choosenText : '',
    }; 
  }

  componentDidMount() {
    this.setState({
      textTheme : this.props.textTheme
    })
    this.fetchTextfile()
  }

  componentDidUpdate() {
    if(this.props.textTheme !== this.state.textTheme) {
      this.setState({
        textTheme : this.props.textTheme
      })
      this.fetchTextfile()
    }
  }

  // fetches the correct text file based on given theme as prop
  fetchTextfile = async function () {
    if( this.props.textTheme === 1) {
      let fetchedFile = await fetch('texts-theme1.json')
      let textFile = await fetchedFile.json()
      this.setState({
        currentTextfile : textFile
      })
    }
    if( this.props.textTheme === 2) {
      let fetchedFile = await fetch('texts-theme2.json')
      let textFile = await fetchedFile.json()
      this.setState({
        currentTextfile : textFile
      })
    }
    if( this.props.textTheme === 3) {
      let fetchedFile = await fetch('texts-theme3.json')
      let textFile = await fetchedFile.json()
      this.setState({
        currentTextfile : textFile
      })
    }
    this.chooseRandomText();
  }

  // pick a random text from the loaded json file containing texts
  chooseRandomText() {
    const { currentTextfile } = this.state
    const texts = [currentTextfile.text1, currentTextfile.text2, currentTextfile.text3, currentTextfile.text4]
    const choosenText = texts[Math.floor(Math.random() * 4)];
    this.setState({
      choosenText : choosenText
    })
  }

  // makes the choosen audio file start playing
  handlePlay() {
    // TODO: fill with appropriate action
  }



  // TODO: create fetch methods from the themes given in props
  // TODO: use fetched elements and use to genererate this artwork



  // the parent render of the react component
  render() {
    const { choosenText } = this.state

    return (
      <div className="artwork-parent">

        <div className="svg-container">
            <img 
                src="https://cloudfour.com/examples/img-currentsrc/images/kitten-small.png"
                alt = "svg-file"
            />
        </div>

        <div className="text-container">
            <p>
                {choosenText}
            </p>
        </div>

        <div className="sound-container">
            {/*maybe not needed, depends how HTML5 audio-tag works*/}
        </div>

        <div className="play-button-container">
          <button className="play-button" onClick={() => this.handlePlay()}>Play sound</button>
        </div>

      </div>
    )
  }
}
