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
      picTheme : '',
      currectPicTheme : '',
      chosenPic : [],
    }; 
  }

  componentDidMount() {
    this.setState({
      textTheme : this.props.textTheme
    })
    this.fetchTextfile()
    this.fetchPicfile()
  }

  componentDidUpdate() {
    if(this.props.textTheme !== this.state.textTheme) {
      this.setState({
        textTheme : this.props.textTheme
      })
      this.fetchTextfile()
      
    }
    if (this.props.picTheme !== this.state.picTheme){
      this.setState({
        picTheme : this.props.picTheme
      })
      this.fetchPicfile()
    }
  }

  fetchPicfile = async function () {
    const picNames = ['feed.svg', 'feed2.svg', 'feed3.svg', 'feed4.svg']
    let randPicture = picNames[Math.floor(Math.random()*4)];
    let fetchedPic = []
    if (this.props.picTheme === 1) {
      fetch('pictures/theme1/'+randPicture)
      .then(res => {
        fetchedPic = res.data;
        console.log(res)
        //console.log("res.data " + res.data)
        
        this.setState({
          chosenPic : fetchedPic
        })
      })


      console.log("pic fetched")
    
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
    const { choosenText, chosenPic } = this.state

    console.log(this.state)

    return (
      <div className="artwork-parent">

        <div className="svg-container">
          <div>{chosenPic}</div>
            {/*<div dangerouslySetInnerHTML={{__html: chosenPic}}/>*/}
        </div>

        <div className="text-container">
            <p>
                {choosenText}
            </p>
        </div>
        <div className="sound-container">
          <button className="play-button" onClick={() => this.handlePlay()}>Play sound</button>
        </div>

      </div>
    )
  }
}
