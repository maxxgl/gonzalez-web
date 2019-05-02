import React from 'react';
import './App.css';
import Movement from './Movement'
import Traffic from './Traffic'
import { NavLink, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <div className="App">
      <header>
        <nav>
          <NavLink exact to="/">
            <button className="btn">Traffic Flow</button>
          </NavLink>
          <NavLink to="/movement">
            <button className="btn">Movement</button>
          </NavLink>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/movement" component={Movement} />
          <Route path="/" component={Traffic} />
        </Switch>
      </main>
    </div>
  )
}
