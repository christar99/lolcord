import React, { Component } from 'react';
import GlobalStyles from 'Components/GlobalStyles';
import PageRouter from 'Components/PageRouter';


class App extends Component {
    render() {
        return (
            <>
                <PageRouter />
                <GlobalStyles />
            </>
        );
    }
}

export default App;
