import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Item from '../pages/Item';
import News from '../pages/News';
import Newest from '../pages/Newest';
import Show from '../pages/Show';
import Ask from '../pages/Ask';
import Jobs from '../pages/Jobs';

function AppShell() {
    return (
        <div>
            <div>
                <Switch>
                    <Route path="/item/:id" component={Item} />
                    <Route path="/:page" component={News} />
                    <Route path="/newest/:page" component={Newest} />
                    <Route path="/show/:page" component={Show} />
                    <Route path="/ask/:page" component={Ask} />
                    <Route path="/jobs/:page" component={Jobs} />
                    <Redirect to="/1" />
                </Switch>
            </div>
        </div>
    );
}

export default AppShell;
