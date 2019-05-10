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
            <Route path="/newest" component={Newest} />
            <Route path="/show" component={Show} />
            <Route path="/ask" component={Ask} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/item/:id" component={Item} />
            <Route component={Error} />
        </Switch>
    );
}

export default Main;
