import React from 'react';
import './Artwork.css';

export default class Artwork extends React.Component {

    //TODO in component: receive props picTheme, soundTheme, textTheme
    //TODO in component: generate a random artwork given the themes above

  constructor(props){ 
    super(props);
    this.state = {
      exampleState : '',    // holds example
    }; 
  }

  // makes the choosen audio file start playing
  handlePlay() {
    // TODO: fill with appropriate action
  }



  // saves the current artwork to storage and mark it as a favourit
  handleSave = function () {
    //TODO : save the current artwork and its positon to local storage
    //TODO : mark current as fav = true
  }

  
  // TODO: create fetch methods from the themes given in props
  // TODO: use fetched elements and use to genererate this artwork



  // the parent render of the react component
  render() {

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
                HEIOGHA TEXT
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
