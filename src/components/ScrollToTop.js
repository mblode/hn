import { Component } from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends Component {
    scrollPositions = {};

    componentWillMount() {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        const {
            history: { action },
            location: { pathname: newPath = 'root' }
        } = this.props;

        const {
            location: { pathname = 'root' }
        } = prevProps;

        if (action === 'POP') {
            const pos = this.scrollPositions[newPath];
            if (pos) {
                setTimeout(() => window.scrollTo(pos[0], pos[1]), 50);
            }
        } else {
            this.scrollPositions[pathname] = [window.pageXOffset, window.pageYOffset];
            setTimeout(() => window.scrollTo(0, 0), 50);
        }
    }

    render() {
        return null;
    }
}

export default withRouter(ScrollToTop);
