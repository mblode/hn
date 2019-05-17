import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Item from '../pages/Item';
import Feed from '../pages/Feed';
import Error from '../pages/Error';

function Main() {
    return (
        <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/item/:id" exact component={Item} />

            <Route path="/:type/:page" component={Feed} />

            <Route component={Error} />
        </Switch>
    );
}

export default Main;
