
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Item from '../pages/Item';
import Feed from '../pages/Feed';

function AppShell() {
    return (
        <div>
            <div>
                <Switch>
                    <Route path="/item/:id" component={Item} />
                    <Route path="/news/:page" component={Feed} />
                    <Route path="/newest/:page" component={Feed} />
                    <Route path="/show/:page" component={Feed} />
                    <Route path="/ask/:page" component={Feed} />
                    <Route path="/jobs/:page" component={Feed} />
                    <Redirect to="/news/1" />
                </Switch>
            </div>
        </div>
    );
}

export default AppShell;
