'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class HomePage extends React.Component {
    render() {

        const neck = <link rel='stylesheet' href="/public/pages/home.min.css"/>;

        return (
            <Layout
                title="Beam"
                neck={neck}
                activeTab="home">

                <div className="jumbotron">
                    <h1>Welcome</h1>
                    <div>
                        <p className="lead"></p>
                        <div>
                            <a className="btn btn-primary btn-lg" href="/login">
                                Login Now
                            </a>
                            &nbsp; or &nbsp;
                            <a className="btn btn-warning btn-lg" href="/login/forgot">Reset your password
                            </a>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


module.exports = HomePage;
