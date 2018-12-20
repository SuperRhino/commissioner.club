import React, { Component } from 'react';
import { ResponsiveProvider, ResponsiveCheck } from './utils/Responsive';
import Sheets from './utils/Sheets';
import './App.css';

import { Header, Footer } from './ui';
import {
  BowlGames,
  History,
  Matchup,
  Playoffs,
  Records,
  TopStory,
} from './components';


const AppFeature = (value) => {
  return (
    <div className="app-feature">
      <TopStory
        story={value.TopStory[0]}
      />
    </div>
  );
};

const AppPrimary = (value) => {
  return (
    <ResponsiveCheck>
    {({ isDesktop }) =>
      <div className="app-primary">
        <Matchup
          title={value.Matchup[2]}
          team1={value.Matchup[0] || []}
          team2={value.Matchup[1] || []}
        />
        {isDesktop && <BowlGames />}
        {!isDesktop && <Playoffs blob={value.Playoffs} />}
        {/* <History /> */}
      </div>
    }
    </ResponsiveCheck>
  );
};

const AppSecondary = (value) => {
  const { Champions, PlayoffAppearances } = value;
  return (
    <ResponsiveCheck>
    {({ isDesktop }) =>
      <div className="app-secondary">
        {isDesktop &&
          <Playoffs blob={value.Playoffs} />
        }
        {!isDesktop && <BowlGames />}
        <Records
          appearances={PlayoffAppearances}
          champs={Champions}
        />
      </div>
    }
  </ResponsiveCheck>
  );
};


class App extends Component {
  state = {
    TopStory: [],
    Champions: [],
    PlayoffAppearances: [],
    Playoffs: [],
    Matchup: [],
  }

  componentDidMount() {
    Sheets.load().then(appData => {
      console.log("appData", appData);
      this.setState(appData);
    });
  }

  render() {
    return (
      <ResponsiveProvider>
        <div className="app">
          <Header />
          <AppFeature {...this.state} />
          <AppPrimary {...this.state} />
          <AppSecondary {...this.state} />
          <Footer />
        </div>
      </ResponsiveProvider>
    );
  }
}

export default App;
