import './App.css';
import Scheme from './components/Scheme';
import { connect } from 'react-redux';
import colrActions from './reducto/colrActions';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Scratch from './components/Scratch';
import SavedColors from './components/SavedColors';

const LoadingIndicator = styled.div`
  font-size: 2em;
  margin: 2em;
  padding: 2em;
`;

export const SchemeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const AppContentContainer = styled.div`
  color: white;
  position: relative;
  height: 100%;
  flex-grow: 1;
`;

const App = props => {
  const { scheme, dispatch } = props;
  const [mod, setMod] = useState({ a: 0, b: 0 });

  // const testthing = (d) => console.log(d);

  // useEffect(() => {
  //   axios.get('http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=testthing')
  //     .then(r => console.log(r));
  // });
  const onKey = e => {
    if (e.charCode === 45) {
      const a = mod.a + (e.shiftKey ? -1 : 1);
      setMod({ ...mod, a: a });
    }

    else if (e.charCode == 43) {
      const b = mod.b + (e.shiftKey ? -1 : 1);
      setMod({ ...mod, b: b });
    }
  };

  document.onkeypress = onKey;

  return (
    <div className="App">
      <header className="App-header">
        <h1>ColLate</h1>
        <p>{`(Get it, cause it's late? I had trouble getting this done because I couldn't pick a project I thought was
             good enough. So I tried working on this, spiralled in a bunch of directions, and didn't really get
             anywhere. But I'm submitting it anyway to show that I can at least deploy an app. [Which, for the record,
             I ended making an api on heroku with a redis store - using authentication set up with environment
             variables. I'll keep working on this project during the week]) (Btw, list colors, click colors to save
             them. I'm gonna build up some actual features.)`}</p>
      </header>

      <SavedColors />

      <AppContentContainer >
        <Route path="/" exact>
          <button onClick={e => dispatch(colrActions.fetchScheme())} >Get a random scheme</button>
          <button onClick={e => dispatch(colrActions.listSchemes())} >List some schemes</button>

          {props.mode === "single" && props.scheme && <Scheme scheme={scheme} mode="background" />}

          {props.mode === "list" && props.schemeList &&
            <SchemeListContainer>
              {props.schemeList.map((scheme, i) => <Scheme scheme={scheme} mode="item" key={i} a={mod.a} b={mod.b} />)}
            </SchemeListContainer>
          }

          {props.isFetching && <LoadingIndicator>Loading....</LoadingIndicator>}
        </Route>

        <Route path="/cl">
          <Scratch />
        </Route>
      </AppContentContainer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    scheme: state.colr.selectedScheme,
    schemeList: state.colr.schemeList,
    isFetching: state.colr.isFetching,
    mode: state.colr.schemeViewMode
  }
}

export default connect(mapStateToProps)(App);
