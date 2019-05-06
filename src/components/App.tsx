import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteProps } from 'react-router-dom'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

interface Props {
}

interface State {
}

class App extends Component<Props & RouteProps, State> {
	render() {
		return (
			<Fragment>
				<div className="main-content">
					<Header />
					<Main />
				</div>

				<Footer />
			</Fragment>
		);
	}
}

const mapStateToProps = (state: State) => ({
	...state
});

export default withRouter(connect(mapStateToProps)(App) as React.ComponentType<any>);
