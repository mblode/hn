import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const AppWrap = styled.div``;

const MainSection = styled.section`
    padding: 12px 0 0;
`;

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

class App extends Component {
    render() {
        return (
            <AppWrap>
                <Header />

                <MainSection>
                    <Container>
                        <Main />
                        <Footer />
                    </Container>
                </MainSection>
            </AppWrap>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(App));
