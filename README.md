## Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and displays a 
responsive website which let users interact with different SVG-elements, sounds and texts to create artworks. 
Users can select desired categories for all elements, and the website will randomly generate four different artworks, 
displayed in separate tabs.

## Motivation
The project is a part of our submission for the subject IT2810 Webutvikling.

## Project requirements

#### React
React has been used extensively thoughout the whole project. 
After initiation the only change we made was to create a React-component out of App.js. 
We chose to do this as it seemed like a reasonable approach when creating a single page application. 


#### AJAX
All elements displayed as part of the artwork are fetched using AJAX. 
When a category is selected, a random number is generated which decides the exact element that is fetched from storage. 
All elements are named using the naming convention *'item1', 'item2',..,'itemN'*. 
The randomly chosen number is parsed into a string to form the path to the exact element in the public folder.

* Pictures: All picture elements on the website are stored in SVG format. The randomly chosen SVG is fetched 
from memory and the data is stored in a variable using ```.text()```. The variable is rendered using 
```dangerouslySetInnerHTML={{__html: variable}}``` and wrapped inside a ```<div>```-element (SVG-container) 
for better editability. We chose to use dangerouslySetInnerHTML as it's the way to set HTML directly from React.
* Sounds: All sound elements on the website are fetched directly from storage by the HTML5 audio-tag. The path of 
the randomly chosen sound is stored inside a variable, which is set as the source in a ```<audio>```-element and then rendered.
This was the suggested procedure by the project description. 
* Texts: All text elements on the website are saved as JSON. Upon fetching, the text is extracted from the JSON and 
stored in a variable. The variable of the chosen text is then rendered. We considered putting connected texts in one file, but 
figured that this solution did not fulfil the given requirement of only loading on demand. 


#### HTML Web Storage
The website implements HTML5 Web Storage using both localstorage and sessionstorage, but in separate ways.

* Session storage is implemented as part of the Artwork.js component and is set every time a category is updated for the sound, 
picture and/or text. For each tab, the local path of the different elements are saved to session storage using JSON. 
We chose to use this solution as it's an easy way to store and re-use previous elements within the boundories of a tab. 
While being in the same browser tab, the page will retrieve the local path for the element from session storage, 
parse it back to its original form and render the elements from your last visit to the page. We figured this was an 
appropriate use of this tool and served a fitting purpose.
* Local storage is implemented and is set every time the category is updated for the sound, 
picture and/or text. For local storage, the exact path for the elements is not saved to storage. Instead each category and 
the artwork-tab is numbered, and the chosen category is saved. 
When opening the browser, the page display elements from the last chosen categories, 
but all elements will be randomly chosen from that category. Not rocket science and maybe we could have made more use of this 
possibility, but we figured it was a decent introduction on our part to begin working with local storage.

#### Responsive Web Design
-- BAT skriv inn litt info her. Hva har du gjort her, hvorfor har du valgt å gjøre det slik. 
Kjør også en vurdering på om vi kan hevde at JEST er benyttet som et framework under eller om vi ikke kan hevde det 
siden det ble som det ble med testene..

#### Test
As required by the project description, we created and executed snapshot testing of our components App and Artwork.
We were not able to integrate "Jest --watchAll" for running the tests due to errors. The snapshot testing is therefore run
by "react-script test" by the command ```npm test```.

#### Deployment and server setup
We followed the instructions given in the assignment document. We experienced only minor issues by doing this. The application was 
deployed at the end of the project. 

## Built with 

#### Frameworks
<ul>
<li><a href="https://github.com/facebook/create-react-app">React</a> - Web framework for JavaScript</li>
<li><a href="https://jestjs.io">Jest</a> - JavaScript testing framework</li>
</ul>

#### Dependencies 
<ul>
<li><a href="https://nodejs.dev/">Node.js</a> - JavaScript runtime environment</li>
<li><a href="https://www.npmjs.com/">npm</a> - Node Package Manager installed as part of Node.js</li>
<li><a href="https://reactjs.org/docs/introducing-jsx.html">JSX</a> - Syntax extension for JavaScript</li>
</ul>

## Repository structure
```
├── build
│       └── . . .
├── public
│   ├── pictures
│   │   └── . . .
│   ├── sounds
│   │   └── . . .
│   └── texts
│        └── . . .
├── src
|   ├── __tests__
|   │   └── Snapshots.test.js
|   ├── components
|   │   └── Artwork
|   │       ├── Artwork.css
|   │       └── Artwork.js
|   ├── App.css
|   ├── App.js
|   ├── index.css
|   ├── index.js
|   └── . . .
├── .gitignore
├── README.md
└── package.json
```

## Development setup

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
We did not manage to integrate Jest running of the tests, so its just handled by the standard "react-scripts test".

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed at the homepage instance given in package.json!

## Credits

Contributors:
* @bjornthe
* @larsmagu
* @olahop
