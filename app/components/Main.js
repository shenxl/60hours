var React = require('react');
var Header = require('./Header');
var Nav = require('./Nav');
var RouteHandler = require('react-router').RouteHandler;

// 加载Css样式
require('../assets/styles/headerNav.scss');

var Main = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <Nav />
                <main>
                    <RouteHandler />
                </main>
            </div>
        )
    }
});
module.exports = Main;