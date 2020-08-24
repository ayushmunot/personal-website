import React, {Component} from "react";
import "./App.css";
import Main from "./containers/Main";
import ReactGA from 'react-ga';


class App extends Component {
  constructor() {
    super();
    this.state = {
      someData: null,
    };

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize('UA-167237015-1');
    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <div>
        <Main />
      </div>
      );
  }
}

export default App;
