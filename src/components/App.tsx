import * as React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="main-content">
					<Header />
					<Main />
				</div>

				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
