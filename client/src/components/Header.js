import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null: // Waiting for request
                return;
            case false: // Not logged in
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default: // Logged in
                return ([
                    <li key="payment"><Payments /></li>,
                    <li key="credits" style={{margin: '0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="logout"><a href="/api/logout">Logout</a></li>
                ]
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? "/surveys" : "/"}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        auth: auth
    };
}

export default connect(mapStateToProps)(Header);