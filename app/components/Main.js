var React = require('react');
var Header = require('./Header/Header');
var RouteHandler = require('react-router').RouteHandler;

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <main className="cd-main-content">
                    <RouteHandler />
                </main>
            </div>
        )
    }
});
module.exports = Main;