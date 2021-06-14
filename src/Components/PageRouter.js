import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from 'Routes/Home';
import Items from 'Routes/Items';
import Champions from 'Routes/Champions';
import Lanking from 'Routes/Lanking';
import Header from 'Components/Header';


const PageRouter = () => (
    <Router>
        <Header />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route Path="/items" exact component={Items} />
            <Route Path="/champions" exact component={Champions} />
            <Route Path="/lanking" exact component={Lanking} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)

export default PageRouter;