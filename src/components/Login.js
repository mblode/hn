import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../actions/userAction';
import { Helmet } from 'react-helmet';
import { Wrap, Content } from './Base';
import { Heading, Alert, Button, Label } from 'roni';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        this.props.dispatch(loginUser(this.state.username, this.state.password));
        event.preventDefault();
    }

    render() {
        const { error } = this.props.user;

        if (error) {
            return <Alert kind='danger'>Failed to load posts</Alert>;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; Login</title>
                </Helmet>

                <Wrap>
                    <Heading>Login</Heading>

                    <Content>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <Label htmlFor='username'>Username:</Label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    required
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor='password'>Password:</Label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    required
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <Button type='submit'>Login</Button>
                        </form>
                    </Content>
                </Wrap>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default withRouter(connect(mapStateToProps)(Login));
