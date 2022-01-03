import React, { Component } from 'react';
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


const AppBody = ({
  TopStory: topStory,
  Champions: champions,
  PlayoffAppearances: playoffAppearances,
  Playoffs: playoffs,
  Matchup: matchup,
  BowlGames: bowlGames,
}) => {
  const [featureStory, ...feedStories] = topStory;
  return (
    <div className="app-body">
      <TopStory story={featureStory} />
      <div className="app-desktop-col1">
        <Matchup
          title={matchup[2] && matchup[2][0]}
          team1={matchup[0] || []}
          team2={matchup[1] || []}
        />
        <BowlGames bowls={bowlGames} />
        <StoryFeed stories={feedStories} />
      </div>
      <div className="app-desktop-col2">
        <Playoffs blob={playoffs} />
        <Records
          appearances={playoffAppearances}
          champs={champions}
        />
        <History />
      </div>
    </div>
  );
}

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
      <div className="app">
        <Header />
        <AppBody {...this.state} />
        <Footer />
      </div>
    );
  }
}

export default App;
