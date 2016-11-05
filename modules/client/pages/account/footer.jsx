'use strict';
const React = require('react');


class Footer extends React.Component {
    render() {

        const year = new Date().getFullYear();

        return (
            <div className="footer navbar-fixed-bottom">
                <div className="container">
                    <span className="copyright pull-right">
                        &#169; {year} Beam mortgage.
                    </span>
                    <ul className="links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/login/logout">Sign out</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}


module.exports = Footer;
