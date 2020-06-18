import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './componets/Header';
import SingleSMS from './componets/SingleSMS';
import BulkSMS from './componets/BulkSMS';

import Page404 from './componets/Page404';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
         <Header />
        <div className="App-header">
         
            <Switch>
              <Route exact path="/" component={SingleSMS} />
              <Route exact path="/bulksms" component={BulkSMS} />
              
              <Route component={Page404} />
            </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;
