import React, {Component} from 'react';
import './App.css';
import Login from './components/login/Login';
import HomePage from './components/homePage/HomePage';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import ProductsTable from "./components/productsTable/ProductsTable";
import ReceivedLogs from "./components/logs/ReceivedLogs";
import SentLogs from "./components/logs/SentLogs";
import StoresTable from "./components/storesTable/StoresTable";


const ProtectedRoute = ({component: Comp, loggedInStatus, username, token, path, handleLogout, ...rest}) => {
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                return loggedInStatus === "LOGGED_IN"
                    ? <Comp
                        {...props}
                        loggedInStatus={loggedInStatus}
                        token={token}
                        username={username}
                        handleLogout={handleLogout}
                    />
                    : <Redirect to={{
                        pathname: "/"
                    }}/>;
            }}
        />
    );
};

class App extends Component {
    constructor() {
        super();

        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            username: "",
            token: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus: "LOGGED_IN",
            username: data.username,
            token: data.token
        })
    }

     handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            username: "",
            token: ""
        })
    }

    render() {
        return (
            <div className="App">
                <Router>

                    <Route
                        path="/"
                        exact
                        render={props => (
                            <Login
                                {...props}
                                handleLogin={this.handleLogin}
                            />
                        )}
                    />

                    <ProtectedRoute
                        path="/homepage"
                        loggedInStatus={this.state.loggedInStatus}
                        token={this.state.token}
                        username={this.state.username}
                        component={HomePage}
                        handleLogout={this.handleLogout}
                    />

                    <ProtectedRoute
                        path="/productsTable"
                        exact
                        loggedInStatus={this.state.loggedInStatus}
                        token={this.state.token}
                        username={this.state.username}
                        component={ProductsTable}
                        handleLogout={this.handleLogout}
                    />

                    <ProtectedRoute
                        path="/sentLogs"
                        exact
                        loggedInStatus={this.state.loggedInStatus}
                        token={this.state.token}
                        username={this.state.username}
                        component={SentLogs}
                        handleLogout={this.handleLogout}
                    />

                    <ProtectedRoute
                        path="/receivedLogs"
                        exact
                        loggedInStatus={this.state.loggedInStatus}
                        token={this.state.token}
                        username={this.state.username}
                        component={ReceivedLogs}
                        handleLogout={this.handleLogout}
                    />

                    <ProtectedRoute
                        path="/storesTable"
                        exact
                        loggedInStatus={this.state.loggedInStatus}
                        token={this.state.token}
                        username={this.state.username}
                        component={StoresTable}
                        handleLogout={this.handleLogout}
                    />
                </Router>
            </div>
        );
    }
}

export default App;
