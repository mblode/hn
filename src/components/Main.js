import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Item from './Item';
import User from './User';
import Feed from './Feed';
import Error from './Error';

function Main() {
    return (
        <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/item/:id" exact component={Item} />
            <Route path="/user/:id" exact component={User} />
            <Route path="/:type/:page" component={Feed} />

            <Route component={Error} />
        </Switch>
    );
}

export default Main;
