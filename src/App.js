import React from 'react';
import './App.css';
import Movement from './Movement'
import Traffic from './Traffic'
import Cockpit from './Cockpit'
import { NavLink, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <div className="App">
      <header>
        <nav>
          <NavLink exact to="/">Traffic Flow</NavLink>
          <NavLink to="/movement">Movement</NavLink>
          <NavLink to="/cockpit">Cockpit</NavLink>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/movement" component={Movement} />
          <Route path="/cockpit" component={Cockpit} />
          <Route path="/" component={Traffic} />
        </Switch>
      </main>
    </div>
  )
}
