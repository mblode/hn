import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Item from '../pages/Item';
import News from '../pages/News';
import Newest from '../pages/Newest';
import Show from '../pages/Show';
import Ask from '../pages/Ask';
import Jobs from '../pages/Jobs';
import Error from '../pages/Error';

function Main() {
    return (
        <Switch>
            <Route path="/" exact component={News} />
            <Route path="/news/:page" component={News} />

            <Route path="/newest" exact component={Newest} />
            <Route path="/newest/:page" component={Newest} />

            <Route path="/show" exact component={Show} />
            <Route path="/show/:page" component={Show} />

            <Route path="/ask" exact component={Ask} />
            <Route path="/ask/:page" component={Ask} />

            <Route path="/jobs" exact component={Jobs} />
            <Route path="/jobs/:page" component={Jobs} />

            <Route path="/item/:id" component={Item} />
            <Route component={Error} />
        </Switch>
    );
}

export default Main;
