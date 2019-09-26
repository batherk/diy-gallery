import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import Artwork from '../components/Artwork/Artwork'

it('App renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Artwork renders correctly', () => {
  const tree = renderer
    .create(<Artwork artNr={1} picTheme={1} soundTheme={1} textTheme={1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
