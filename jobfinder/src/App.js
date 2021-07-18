import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import {routes} from "./config/router"
import "./global.css"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
        
        
    
}
  render() {
    return (
      <div className="app h-100% d-flex flex-column">
        
      <BrowserRouter>
        <Switch>
          {routes.map((route) => route.redirectTo ? <Redirect key={route.path} to={route.redirectTo}/> : <Route key={route.path} exact={true} path={route.path} component={route.component}/>)}
        </Switch>
     
      </BrowserRouter>
      </div>
    )
  }
}
