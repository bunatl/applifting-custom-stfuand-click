import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

// import styles
import './styles/styles.scss'

// components import
import { Quote, SharingInfo } from './components/Header'
import { Clicks, MainClickingButton } from './components/content/Clicks'
import TotalClicks from './components/content/TotalClicks'
import Leaderboard from './components/content/Leaderboard'
import Motivation from './components/content/Motivation'
import Footer from './components/Footer'

// import root reducer
import combinedReducers from './reducers'

const store = createStore(combinedReducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header>
          <div className="title"><h1>stfuandclick.com</h1></div>
          <Route path="/" exact component={Quote} />
          <Route path="/:slug" component={SharingInfo} />
        </header>
        <main>
          <Route path="/" exact component={Clicks} />
          <Route path="/:slug" component={MainClickingButton} />
          <Route path="/:slug" component={TotalClicks} />
          <Route path="/" component={Leaderboard} />
          <Route path="/" component={Motivation} />
        </main>
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
