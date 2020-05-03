import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvotePost } from '../actions/userAction';
import { LoaderAlt, Like } from 'styled-icons/boxicons-regular';

class Upvote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            upvoting: false,
            upvoted: false,
        };
    }

    upvote = () => {
        const { id } = this.props;
        const { upvoting, upvoted } = this.state;

        if (upvoting || upvoted) return;

        this.setState({
            upvoting: true,
            upvoted: true,
        });

        this.props.dispatch(upvotePost(id));
    };

    render() {
        const { upvoting, upvoted } = this.state;

        if (upvoting) {
            return <LoaderAlt />;
        } else {
            return <Like name='like' onClick={this.upvote} />;
        }
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(Upvote);
