import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';

export const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/:id">
                <App />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;
