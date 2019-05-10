import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Item from '../pages/Item';
import News from '../pages/News';
import Newest from '../pages/Newest';
import Show from '../pages/Show';
import Ask from '../pages/Ask';
import Jobs from '../pages/Jobs';

function Main() {
    return (
        <Switch>
            <Route path="/hn-react/item/:id" component={Item} />
            <Route path="/hn-react/top/:page" component={News} />
            <Route path="/hn-react/newest/:page" component={Newest} />
            <Route path="/hn-react/show/:page" component={Show} />
            <Route path="/hn-react/ask/:page" component={Ask} />
            <Route path="/hn-react/jobs/:page" component={Jobs} />
            <Redirect to="/hn-react/top/1" />
        </Switch>
    );
}

export default Main;
