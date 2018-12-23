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
  StoryFeed,
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
  const stories = value.TopStory.slice(1);
  return (
    <ResponsiveCheck>
    {({ isDesktop }) =>
      <div className="app-primary">
        <Matchup
          title={value.Matchup[2] && value.Matchup[2][0]}
          team1={value.Matchup[0] || []}
          team2={value.Matchup[1] || []}
          isDesktop={isDesktop}
        />
        {isDesktop && <BowlGames bowls={value.BowlGames} />}
        {isDesktop && <StoryFeed stories={stories} />}
        {!isDesktop && <Playoffs blob={value.Playoffs} />}
      </div>
    }
    </ResponsiveCheck>
  );
};

const AppSecondary = (value) => {
  const { Champions, PlayoffAppearances } = value;
  const stories = value.TopStory.slice(1);
  return (
    <ResponsiveCheck>
    {({ isDesktop }) =>
      <div className="app-secondary">
        {isDesktop &&
          <Playoffs blob={value.Playoffs} />
        }
        {!isDesktop && <BowlGames bowls={value.BowlGames} />}
        {!isDesktop && <StoryFeed stories={stories} />}
        <Records
          appearances={PlayoffAppearances}
          champs={Champions}
        />
      </div>
    }
  </ResponsiveCheck>
  );
};

const AppBody = (value) =>
  <div className="app-body">
    <AppFeature {...value} />
    <AppPrimary {...value} />
    <AppSecondary {...value} />
  </div>


class App extends Component {
  state = {
    TopStory: [],
    Champions: [],
    PlayoffAppearances: [],
    Playoffs: [],
    Matchup: [],
    BowlGames: [],
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
          <AppBody {...this.state} />
          <Footer />
        </div>
      </ResponsiveProvider>
    );
  }
}

export default App;
