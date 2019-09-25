## Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and displays a responsive website 
which let users interact with different SVG-elements, sounds and texts to create artworks. Users can select desired categories for all 
elements, and the website will randomly generate four different artworks, displayed in separate tabs.

## Motivation
The project is a part of our submission for the subject IT2810 Webutvikling.

## Project requirements
#### React
#### AJAX
#### HTML Web Storage
The website implements both localstorage and sessionstorage.

* Session storage is implemented as part of the Artwork.js component and is set every time the category is updated for the sound, picture or text. For each tab, the local path for the different elements diplayed on the page are saved to session storage using JSON. When refreshing the page or opening it in a new tab, the page will retrieve the local path for the element from session storage, parse it back to its original form and render the elements from your last session to the screen.

#### Responsive Web Design
#### Node.js and NPM
#### Test
#### Deployment and server setup

## Built with 

#### Frameworks
<ul>
<li><a href="https://github.com/facebook/create-react-app">React</a> - Web framework for JavaScript</li>
<li><a href="https://jestjs.io">Jest</a> - JavaScript testing framework</li>
</ul>

#### Dependencies 
<ul>
<li><a href="https://nodejs.dev/">Node.js</a> - JavaScript runtime environment</li>
<li><a href="https://reactjs.org/docs/introducing-jsx.html">JSX</a> - Syntax extension for JavaScript</li>
</ul>

## React directory structure
```
├── node_modules
│       └── . . .
├── public
│   ├── pictures
│   │   └── . . .
│   ├── sounds
│   │   └── . . .
│   └── texts
│        └── . . .
└── src
    ├── components
    │   └── Artwork
    │       ├── css
    │       │   └── . . .
    │       └── js
    │           └── . . .
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    └── App.test.js
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
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Credits

Credits to:
* @olahop
* @bjornthe
* @larsmagu
